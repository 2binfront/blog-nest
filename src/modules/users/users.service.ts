import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// 这应该是一个真正的类/接口，代表一个用户实体
export type User = any;

@Injectable()
export class UsersService {
  constructor(private config: ConfigService) {
    if (this.config.get('PASSWORD')) this.users[0].password = this.config.get('PASSWORD');
  }
  private readonly users = [
    {
      userId: 1,
      username: 'hh',
      password: 'hh123456',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
