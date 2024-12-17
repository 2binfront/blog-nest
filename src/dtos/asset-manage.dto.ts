import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { AssetUserDto, ScoreHistoryUserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
export class CreateAssetDto {
  is_intranet: number = 0;

  @IsNotEmpty()
  name: string = '';

  location: string = '';

  @IsOptional()
  number?: string = '';

  @IsNotEmpty()
  type_name: string = '';

  owner_id: number = 0;
  user_id?: number = 0;

  image_ids: number[] = [];
}

export class UpdateAssetDto {
  location: string = '';

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  user_id: number = 0;

  image_ids: number[] = [];
}

export class UpdateAssetIdDto {
  user_ids: number[] = [];
  is_asset_staff: boolean = false;
}

export class UpdateAssetIdAdminDto {
  add_list: UpdateAssetIdDto = null;
  delete_list: UpdateAssetIdDto = null;
}

export class AssetTypeDto {
  id: number = 0;
  name: string = '';
}

export const DepartmentType = {
  INTRANET: 0, // 内网
  EXTRANET: 1, // 外网
};

export const AssetUpdateType = {
  LEND: '借用',
  BACK: '归还',
};

export class SelectAssetDto {
  is_intranet: (1 | 0)[] = [];
  type_id: number[] = [];
}

export class BaseAssetDto {
  id: number = 0;
  is_intranet: number = 0;
  number: string = '';
  name: string = '';
  location: string = '';
  update_time: string = '';
  type: AssetTypeDto = null;
  owner: AssetUserDto = null;
  user: AssetUserDto = null;
  images: string[] = [];
}
