import { IsInt, IsString, IsOptional, IsEnum, MaxLength, IsUrl, IsNotEmpty } from 'class-validator';
import { ImageDto } from './forum.dto';

export class CreateKeywordDto {
  @IsNotEmpty()
  @IsString()
  name: string = '';
  prod_art_ids: number[] = [];
}

export class UpdateKeywordDto {
  add_prod_ids: number[];
  delete_prod_ids: number[];
}

export class ProductsArticle {
  @IsInt()
  id: number;

  @IsString()
  name: string = '';

  @IsString()
  @IsOptional()
  desc?: string = '';

  @IsOptional()
  img?: ImageDto = null;

  @IsOptional()
  msg_type: string = 'text';

  @IsUrl({}, { message: '必须是有效的 URL 地址' })
  @IsOptional()
  url?: string = '';

  @IsOptional()
  qr?: string[] = [];
}
