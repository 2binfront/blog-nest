import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly failures = new Map<string, { count: number; blockedUntil: number }>();
  private readonly maxFailures = 5;
  private readonly windowMs = 15 * 60 * 1000;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string, ip = 'unknown'): Promise<any> {
    const key = `${ip}:${username.trim().toLowerCase()}`;
    const now = Date.now();
    const attempt = this.failures.get(key);
    if (attempt?.blockedUntil && attempt.blockedUntil > now) {
      throw new HttpException('Too many login attempts', HttpStatus.TOO_MANY_REQUESTS);
    }
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      const next = attempt && attempt.blockedUntil <= now ? { count: 0, blockedUntil: 0 } : (attempt ?? { count: 0, blockedUntil: 0 });
      next.count += 1;
      if (next.count >= this.maxFailures) next.blockedUntil = now + this.windowMs;
      this.failures.set(key, next);
      throw new UnauthorizedException();
    }
    this.failures.delete(key);
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
