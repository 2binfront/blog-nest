import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  phone_no: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class AdminLoginDto {
  @IsNotEmpty()
  @IsString()
  admin_password: string;

  @IsNotEmpty()
  @IsString()
  phone_no: string;
}

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  @IsString()
  phone_no: string = '';

  @IsOptional()
  wx_uid: string = 'cowave';

  @IsNotEmpty()
  @IsString()
  department_id: string;
  @IsNotEmpty()
  @IsString()
  title_rank: string;
  @IsNotEmpty()
  @IsString()
  post_id: string;
  @IsNotEmpty()
  @IsString()
  report_to_user: string;

  @IsNotEmpty()
  //   @IsDateString()
  birth: string | Date = new Date();

  @IsNotEmpty()
  //   @IsDateString()
  mod_time: string | Date = new Date();

  @IsNotEmpty()
  @IsBoolean()
  is_staff: boolean = false;

  @IsOptional()
  @IsString()
  admin_password: string;

  @IsNotEmpty()
  @IsBoolean()
  is_invalid: boolean = false;

  @ApiProperty({
    description: '头像链接',
    required: false,
  })
  @IsOptional()
  @IsString()
  image: string;
  @ApiProperty({
    description: '季度打赏积分上限',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  all_tipping_points: number = 100;

  @ApiProperty({
    description: '当前打赏积分',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  tipping_points: number;
}

export class RankUserDto {
  @IsOptional()
  @IsString()
  id: number = 100000;

  @IsOptional()
  @IsString()
  name: string = '';

  @IsOptional()
  @IsString()
  image: string = '';

  score: number = 0;
  phone_no: string = '';
  user_badges: CreateUserBadgeDto[] = [];
  //   valid_badges: CreateUserBadgeDto[] = [];
}
export class BaseUserShowDto {
  id: number = 100000;
  name: string = '';
  phone_no: string = '';
  image: string = '';
  valid_badges: CreateUserBadgeDto[] = [];
  score: number = 0;
  user_badges: CreateUserBadgeDto[] = [];
  title_rank: string = '';
  report_to_user: string = '';
  post: PostDto = new PostDto();
  department: DepartmentDto = new DepartmentDto();
  badges_date: Date = new Date();
  //   tipping_points: number = 0;
  //   is_asset_staff: boolean = false;
  //   is_unlimited: boolean = false;
}
export class BaseUserIntroDto extends BaseUserShowDto {
  is_staff: boolean = false;
  mod_time: Date = new Date();
  birth: Date = new Date();
  email: string = '';
  is_asset_staff: boolean = false;
  uninterrupted_sign_days: number = 0;
  tipping_points: number = 0;
  is_unlimited: boolean = false;
  badge_buff: number = 1;
  has_signed: boolean = false;
  invalid_score: number = 0;
  user_detail: UserDetailDto = new UserDetailDto();
}
export class BaseUserMeDto extends BaseUserShowDto {
  mod_time: Date = new Date();
  birth: Date = new Date();
  email: string = '';
  is_asset_staff: boolean = false;
  uninterrupted_sign_days: number = 0;
  has_signed: boolean = false;
  invalid_score: number = 0;
  tipping_points: number = 0;
}
export class UserPrismaDto {
  id: number = 0;
  name: string = '';
  phone_no: string = '';
  //   wx_uid: string = '';
  title_rank: string = '';
  report_to_user: string = '';
  birth: Date = new Date();
  mod_time: Date = new Date();
  is_staff: boolean = false;
  //   is_invalid: boolean = false;
  image: string = '';
  score: number = 0;
  badges_date: Date = new Date();
  //   admin_password: string = '';
  email: string = '';
  uninterrupted_sign_days: number = 0;
  is_asset_staff: boolean = false;
  is_unlimited: boolean = false;
  tipping_points: number = 0;
  department: DepartmentDto = new DepartmentDto();
  post: PostDto = new PostDto();
  user_badges: CreateUserBadgeDto[] = [];
}
export class AdminShowUserDto extends RankUserDto {
  title_rank: string = '';
  report_to_user: string = '';
  post: PostDto = new PostDto();
  phone_no: string = '';
  tipping_points: number = 0;
  all_tipping_points: number = 0;
  is_staff: boolean = false;
  is_asset_staff: boolean = false;
  is_unlimited: boolean = false;
  department: DepartmentDto = new DepartmentDto();
  badges_date: Date = new Date();
}

export class ScoreHistoryUserDto {
  id: number = 0;
  name: string = '';
  image: string = '';
  title_rank: string = '';
  post: PostDto = new PostDto();
  department: DepartmentDto = new DepartmentDto();
}

export class AssetUserDto extends ScoreHistoryUserDto {
  is_invalid: boolean = false;
  phone_no: string = '';
}

export class UserDetailDto {
  @IsNotEmpty()
  @IsString()
  introduction: string = '';
  @IsNotEmpty()
  @IsString()
  strengths: string = '';
  @IsNotEmpty()
  @IsString()
  hobby_tags: string = '';
  @IsNotEmpty()
  @IsString()
  photo_url: string = '';
}
export class CreateUserBadgeDto {
  @IsNotEmpty()
  user_ids: number[];

  @IsNotEmpty()
  badge_ids: number[];

  @IsOptional()
  @IsString()
  act_type: string = 'create';

  @IsOptional()
  //   @IsDate()
  badge_time: Date;
}

export class Badge {
  /**
   * Image
   * 可选并提供默认值
   */
  @IsNotEmpty()
  @IsString()
  image: string = '';
  /**
   * Image Gray
   */
  @IsNotEmpty()
  @IsString()
  image_gray: string = '';
  /**
   * Image Light
   */
  @IsNotEmpty()
  @IsString()
  image_light: string = '';
  /**
   * Name
   * IsString()装饰器是给pipe看的，:string是给编辑器看的
   */
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class DepartmentDto {
  @IsOptional()
  @IsString()
  id: string = '';

  @IsOptional()
  @IsString()
  parent_id: string = '';

  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value == '1')
  can_reception: boolean = false;

  @IsOptional()
  @IsString()
  introduction: string = '';

  // 越小排越前
  @IsOptional()
  @IsNumber()
  sequence: number = 1000;
}

export class PostDto {
  @IsOptional()
  @IsString()
  id: string = '';

  @IsNotEmpty()
  @IsString()
  name: string = '';
}

export class PostRankDto {
  @IsOptional()
  @IsNumber()
  id: number = 0;

  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  @IsString()
  description: string = '';
}
