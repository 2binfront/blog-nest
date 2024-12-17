import { IsNotEmpty } from 'class-validator';
import { ImageDto, PosterDto } from './forum.dto';

export const ActivityStateEnum = {
  PUBLISHABLE: 0,
  PUBLISHED: 1,
  EXPIRED: 2,
};

export const PrizeTypes = {
  POINTS: 0,
  COMMODITY: 1,
};

export class UpdateActivityStateDto {
  id: number = 0;
  state: (typeof ActivityStateEnum)[keyof typeof ActivityStateEnum] = ActivityStateEnum.PUBLISHABLE;
}

export class CreateActivityDto {
  @IsNotEmpty()
  title: string = '';
  is_forever: boolean = false;
  start_time: string | Date = null;
  over_time: string | Date = null;
  color: string = '';
  extra_points: boolean = false;
  points: number = 0;
  is_pop_ups: boolean = false;
  rules: string = '';
  @IsNotEmpty()
  banner_id: number[] = [];
  posters_id: number[] = [];
}
export class UpdateActivityDto {}

export class CreateLotteryActivityDto {
  p_type: number;
  count: number;
  unlimited: boolean;
  day_refresh_num: number;
  probability: number;
  commodity_id: number;
}
export class UpdateLotteryActivityDto {}

export class ActivityTagDto {
  id: number = 0;
  name: string = '';
  sequence: number = 0;
  is_topic: boolean = false;
}

export class ActivityCreatorDto {
  id: number = 0;
  name: string = '';
  //   valid_badges: any[];
}
export class ActivityDto {
  id: number = 0;
  title: string = '';
  is_forever: boolean = false;
  start_time: Date = new Date();
  over_time: Date = new Date();
  color: string = '';
  extra_points: boolean = false;
  points: number = 0;
  is_pop_ups: boolean = false;
  rules: string = '';
  state: number = 0;
  create_time: Date = new Date();
  creator_id: number = 0;
  tag_id: number = 0;
}

export class ActivityPrismaDto {
  title: string = '';
  is_forever: boolean = false;
  start_time: string | Date = null;
  over_time: string | Date = null;
  color: string = '';
  extra_points: boolean = false;
  points: number = 0;
  is_pop_ups: boolean = false;
  rules: string = '';
  state: number = 0;
  create_time: string = '';
}

export class ActivityFullDto {
  id: number = 0;
  title: string = '';
  is_forever: boolean = false;
  start_time: string | Date = null;
  over_time: string | Date = null;
  color: string = '';
  extra_points: boolean = false;
  points: number = 0;
  is_pop_ups: boolean = false;
  rules: string = '';
  state: number = 0;
  create_time: string = '';

  banner: ImageDto[] = [];

  posters: ImageDto[] = [];

  tag: ActivityTagDto = null;

  creator: ActivityCreatorDto = null;
}
