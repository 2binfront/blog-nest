import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum ConsumeState {
  // 商品兑换状态
  stocking = 0, //备货中
  pending = 1, //待取货
  completed = 2, // 订单完成
}

export class CreateCommodityDto {
  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  cost: number = 0;

  @IsOptional()
  description: string = '';

  @IsNotEmpty()
  @IsString()
  image: string = '';

  @ApiProperty({ name: '折扣', type: Number })
  @IsOptional()
  discount: number = 1;

  @IsOptional()
  is_good: boolean = false;

  @IsNotEmpty()
  @IsNumber()
  consume_limit: number = 0;
}
export class UpdateCommodityDto extends CreateCommodityDto {}
export class CreateConsumeRecordDto {
  @IsNotEmpty()
  @IsNumber()
  commodity_id: number = 0;

  @IsNotEmpty()
  @IsBoolean()
  is_discount: boolean = false;

  @IsOptional()
  note: string = '';
}
export class UpdateConsumeRecordDto {}

export class UserCommodityDto {
  id: number = 0;
  name: string = '';
  cost: number = 0;
  description: string = '';
  image: string = '';
  consume_count: number = 0;
  discount: number = 0;
  is_good: boolean = false;
  consume_limit: number = 0;
}

export class AdminCommodityDto extends UserCommodityDto {
  hide: boolean = false;
  created_at: string = '';
}

export class FilterParamsDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_time: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_time: Date;

  @IsOptional()
  @IsEnum(ConsumeState)
  state: ConsumeState;
}
