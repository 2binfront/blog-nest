import { BadGatewayException, BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

const maxImageSize = 10 * 1024 * 1024;
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

@Injectable()
export class R2Service {
  private readonly client: S3Client | null;
  private readonly bucket: string;
  private readonly publicUrl: string;
  private readonly endpoint: string;
  private readonly attempts = new Map<string, { count: number; resetAt: number }>();

  constructor(private readonly config: ConfigService) {
    const accountId = this.config.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.config.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('R2_SECRET_ACCESS_KEY');
    this.bucket = this.config.get<string>('R2_BUCKET_NAME') ?? '';
    const configuredPublicUrl = (this.config.get<string>('R2_PUBLIC_URL') ?? '').trim().replace(/\/$/, '');
    this.publicUrl = configuredPublicUrl && !/^https?:\/\//i.test(configuredPublicUrl)
      ? `https://${configuredPublicUrl}`
      : configuredPublicUrl;
    this.endpoint = accountId ? `https://${accountId}.r2.cloudflarestorage.com` : '';
    this.client = accountId && accessKeyId && secretAccessKey && this.bucket
      ? new S3Client({
          region: 'auto',
          endpoint: this.endpoint,
          credentials: { accessKeyId, secretAccessKey },
        })
      : null;
  }

  async uploadImage(file: { mimetype: string; size: number; buffer: Buffer }, ownerId: number, ip: string) {
    if (!Buffer.isBuffer(file.buffer) || !allowedTypes.has(file.mimetype) || file.size < 1 || file.size > maxImageSize) {
      throw new BadRequestException('Only JPG, PNG, WebP and GIF images up to 10 MB are allowed');
    }
    if (!this.matchesImageSignature(file.buffer, file.mimetype)) {
      throw new BadRequestException('Invalid image file');
    }
    if (!this.client || !this.bucket || !this.publicUrl) {
      throw new ServiceUnavailableException('Image storage is not configured');
    }

    const now = Date.now();
    const rateKey = `${ownerId}:${ip}`;
    const attempt = this.attempts.get(rateKey);
    if (attempt?.resetAt > now && attempt.count >= 20) {
      throw new BadRequestException('Upload limit reached, try again later');
    }
    if (!attempt || attempt.resetAt <= now) {
      this.attempts.set(rateKey, { count: 1, resetAt: now + 60 * 60 * 1000 });
    } else {
      attempt.count += 1;
    }

    const extension = file.mimetype === 'image/jpeg' ? '.jpg' : `.${file.mimetype.slice(6)}`;
    const uploadDate = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
    const imageId = randomUUID();
    const key = `blog/${uploadDate}/${imageId}${extension}`;
    try {
      await this.client.send(new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
        CacheControl: 'public, max-age=31536000, immutable',
      }));
    } catch (error: any) {
      console.error('R2 image upload failed', {
        name: error?.name,
        code: error?.Code ?? error?.code,
        message: error?.message,
        statusCode: error?.$metadata?.httpStatusCode,
        requestId: error?.$metadata?.requestId,
        bucket: this.bucket,
        endpoint: this.endpoint,
      });
      const code = error?.Code ?? error?.code ?? error?.name ?? 'UnknownR2Error';
      throw new BadGatewayException(`R2 upload failed (${code}). Check R2_BUCKET_NAME and token permissions.`);
    }
    return { publicUrl: `${this.publicUrl}/${key}`, key };
  }

  private matchesImageSignature(buffer: Buffer, mimeType: string) {
    if (mimeType === 'image/jpeg') return buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]));
    if (mimeType === 'image/png') return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    if (mimeType === 'image/gif') return ['GIF87a', 'GIF89a'].includes(buffer.subarray(0, 6).toString('ascii'));
    if (mimeType === 'image/webp') return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
    return false;
  }
}
