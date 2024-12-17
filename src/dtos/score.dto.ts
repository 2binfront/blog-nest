import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ScoreHistoryUserDto } from './user.dto';
import { generateFields } from 'src/utils';

export class CreateScoreHistoryDto {
  @IsNotEmpty()
  user_ids: number[] = [];

  @IsNotEmpty()
  @IsNumber()
  score: number = 0;

  @IsNotEmpty()
  @IsString()
  reason: string = '';

  @IsNotEmpty()
  @IsNumber()
  change_type: number = 0;
}
export class UpdateScoreHistoryDto {}
export class UpdateReportRecordDto {}
export class CreateReportRecordDto {}

export class CreateApplyRecordDto {
  @IsOptional()
  @IsString()
  reason: string = '';

  @IsOptional()
  @IsString()
  apply_image: string = '';

  @IsNotEmpty()
  @IsNumber()
  apply_tag_id: number = 0;

  @IsOptional()
  @IsNumber()
  image_id: number = 0;

  @IsOptional()
  @IsNumber()
  pure: number = 0;
}

export class ApplyRecordDto {
  id: number = 0;
  apply_time: Date | string = '';
  state: number = 0;
  reason: string = '';
  apply_image: string = '';
  value: number = 0;
  upvote_count: number = 0;
  //   apply_tag: ApplyTag = null;
  //   apply_upvote_records: UserId[] = [];
  //   user: ScoreHistoryUserDto = null;
}
export class UserId {
  user_id: number;
}

export class ApplyTag {
  title: string = '';
  icon: string = '';
  score: number = 0;
}

export class UpdateApplyRecordDto {}
