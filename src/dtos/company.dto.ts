import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackAdviceDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateFeedbackAdviceDto extends PartialType(CreateFeedbackAdviceDto) {}

export class CreateReceptionDto {}
export class UpdateReceptionDto extends PartialType(CreateReceptionDto) {}
