export class CreateArticleDto {
  id: string;
  title: string;
  content: string;
  create_time: Date;
  modified_time: Date;
  category: string;
  tage: [string] | [];
}
export class UpdateArticleDto {
  id: string;
  title: string;
  content: string;
  create_time: Date;
  modified_time: Date;
  category: string;
  tage: [string] | [];
}
