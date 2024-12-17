import { PartialType } from '@nestjs/mapped-types';
import { ScoreHistoryUserDto } from './user.dto';
import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { ActivityDto } from './activity.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateForumDto {}

export class UpdateForumDto {}

export class CreateArticleCommentDto {
  to_user_id: number = 0;
  to_user_name: string = '';

  @ValidateIf((o) => !o.poster_ids || o.poster_ids.length === 0)
  @IsNotEmpty()
  content: string = '';

  is_anonymous: boolean = false;
  remark: string = '';
  points: number = 0;
  is_tipping: boolean = false;
  parent_comment_id: number = 0;
  article_id: number = 0;
  tipping_comment_id: number = 0;
  is_use_score: boolean = false;

  poster_ids: number[] = [];
  at_user_ids: number[] = [];

  user?: ScoreHistoryUserDto = null;
  anonymous_user?: AnonymousUserDto = null;
}
export class UpdateArticleCommentDto extends PartialType(CreateArticleCommentDto) {}

export class ForumArticleDto {
  create_date: Date | null = null; // DateTime? -> Date | null
  write_date: Date | null = null; // DateTime? -> Date | null
  id: number = 0; // Int -> number
  con_type: number = 0; // Int -> number
  title: string = ''; // String? -> string (nullable but with default value)
  content: string | null = null; // String? -> string | null
  is_delete: boolean = false; // Boolean -> boolean
  is_essential: boolean = false; // Boolean -> boolean
  essential_score: number = 0; // Int -> number
  is_topping: boolean = false; // Boolean -> boolean
  is_topping_score: number = 0; // Int -> number
  upvote_count: number = 0; // Int -> number
  comment_count: number = 0; // Int -> number
  read_count: number = 0; // Int -> number
  upvote_score: number = 0; // Int -> number
  comment_score: number = 0; // Int -> number
  expiring_day: number | null = 0; // Int? -> number | null
  is_anonymous: boolean = false; // Boolean -> boolean
  publish_date: Date | null = null; // DateTime? -> Date | null
  anonymous_user_id: number | null = null; // Int? -> number | null
  user_id: number = 0; // Int -> number
  tipped_points: number = 0; // Int -> number

  constructor(init?: Partial<ForumArticleDto>) {
    Object.assign(this, init);
  }
}

export class CreateForumArticleDto {
  @IsNotEmpty()
  con_type: number = 1;

  @IsOptional()
  title: string = '';

  @ValidateIf((o) => !o.poster_ids || o.poster_ids.length === 0)
  @IsNotEmpty()
  content: string = '';

  @IsOptional()
  read_count: number = 0;

  @IsOptional()
  expiring_day: number = 0;

  @IsNotEmpty()
  is_anonymous: boolean = false;

  @IsNotEmpty()
  @Type(() => Date)
  publish_date: string = '';

  poster_ids?: number[] = [];

  video_ids?: number[] = [];

  tags?: ArticleTag[] = [];

  at_user_ids?: number[] = [];

  reward_user_ids?: number[] = [];

  anonymous_user: AnonymousUserDto = null;
}
export class UpdateForumArticleDto extends PartialType(CreateForumArticleDto) {}

export class ArticleTag {
  id: number = 0;
  name: string = '';
  sequence: number = 0;
  is_topic: boolean = false;
  activity?: ActivityDto = null;
}

export class ImageDto {
  height: number = 0;
  id: number = 0;
  origin_url: string = '';
  mobile_image?: string = '';
  sequence: number = 0;
  size: string = '';
  width: number = 0;
}

export class PosterDto {
  //   article: ArticleDto = null;
  image: ImageDto = null;
}

export class ArticleCountDto {
  @ApiProperty({
    description: 'tag id',
  })
  id: number = 1;
  @ApiProperty({
    description: 'tag name',
  })
  name: string = '';

  @ApiProperty({
    description: '是否主题标签',
  })
  is_topic: boolean = false;

  @ApiProperty({
    description: '文章数量',
  })
  _count: number = 1;
}

export class AnonymousUserDto {
  clique?: string = '';
  id?: number = 0;
  image: string = '';
  name: string = '';
  title: string = '';
}

export class NotifycationDto {
  id: number = 0;
  create_date: Date = new Date();
  write_date: Date = new Date();
  is_see: boolean = false;
  notice_type: string = '';
  tipping_points: number = 0;
  sender: ScoreHistoryUserDto = null;
  receiver: ScoreHistoryUserDto = null;
  comment: CommentDto = null;
  article: ArticleDto = null;
}

export class ArticleDto {
  con_type: number = 0;
  title: string = '';
  content: string = '0';
  is_delete: boolean = false;
  is_essential: boolean = false;
  essential_score: number = 0;
  is_topping: boolean = false;
  is_topping_score: number = 0;
  upvote_count: number = 0;
  comment_count: number = 0;
  read_count: number = 0;
  upvote_score: number = 0;
  comment_score: number = 0;
  expiring_day: number = 0;
  is_anonymous: boolean = false;
  publish_date: string | Date = null;
  tipped_points: number = 0;
  user: ScoreHistoryUserDto = null;
  anonymous_user: AnonymousUserDto = null;
  posters: PosterDto[] = [];
  id: number = 0;
  tags: any[] = [];
}

export class CommentDto {
  to_user_id: number = 0;
  to_user_name: any = null;
  content: string = '';
  is_essential: boolean = false;
  upvote_count: number = 0;
  is_anonymous: boolean = false;
  is_delete: boolean = false;
  tipped_points: number = 0;
  remark: string = '';
  points: number = 0;
  is_tipping: boolean = true;
  id: number = 0;
  tipping_comment_id: any = null;
  user: ScoreHistoryUserDto = null;
  posters: PosterDto[] = [];
  parent_comment: CommentDto = null;
  article: ArticleDto = null;
  anonymous_user: AnonymousUserDto = null;
  comment_upvotes: any[] = [];
}
