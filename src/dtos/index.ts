import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export * from './oa.dto';
export * from './commodity.dto';
export * from './forum.dto';
export * from './activity.dto';
export * from './user.dto';
export * from './score.dto';
export * from './company.dto';
export * from './cp-test.dto';
export * from './asset-manage.dto';

export const CliqueList = ['武侠小说', '古代诗人', '黑猫警长', '王者荣耀', '动漫人物'];

export class Tag {
  @ApiProperty({ description: '标签id', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ description: '标签名称', required: true })
  @IsString()
  name?: string;

  @ApiProperty({ description: '标签排序', required: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sequence?: number;
}

export class Category {
  @ApiProperty({ description: '分类id', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ description: '分类名称', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: '分类排序', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sequence?: number;
}

export class Article {
  @ApiProperty({ description: '文章id', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @ApiProperty({ description: '文章标题', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '文章内容', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: '文章分类', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  category_id?: number;

  @ApiProperty({ description: '文章标签', required: false })
  @IsOptional()
  tag_ids?: number[];

  @ApiProperty({ description: '文章排序', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sequence?: number;
}

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  size?: number;

  @IsOptional()
  @IsString()
  order_by?: string;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  score_type?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value === 'true') {
      return 1;
    } else if (value === 'false') {
      return 0;
    } else {
      return Number(value);
    }
  })
  state?: number;

  @IsOptional()
  @IsString()
  type_int?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === '1')
  only_mine?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === '1')
  hide?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  score?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === '1')
  is_mine?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === '1')
  is_me?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === '1')
  is_today?: boolean;

  @IsOptional()
  @IsString()
  tag_name?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  con_type?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  article_id?: number;

  @IsOptional()
  @IsString()
  number?: string;
}

export class QueryCount {
  @ApiProperty({ description: '用户id，不传默认全体', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  user_id?: number;

  @ApiProperty({ description: '年份，不传默认今年', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  year?: number;

  @ApiProperty({ description: '月份，不传默认全年', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  month?: number;

  @ApiProperty({ description: '主题名称过滤，不传默认全体主题', required: false })
  @IsOptional()
  @IsString()
  tag_name?: string;
}

export class UpdateIds {
  @IsOptional()
  data_ids?: number[] = [];
}

export class PrismaPaginationParam {
  @IsOptional()
  @IsPositive()
  take?: number;

  @IsOptional()
  @Min(0)
  skip?: number;

  @IsOptional()
  orderBy?: any;
}

export class PaginationParam extends PrismaPaginationParam {
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  size?: number;

  @IsOptional()
  total?: number;
}
