import { SetMetadata } from '@nestjs/common';

// 鉴权角色：admin, assets_admin, user, visitor
export const Role = (role: string) => SetMetadata('Role', role);
