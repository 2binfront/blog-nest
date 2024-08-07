import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
export type ArticleMetaDocument = ArticleMeta & mongoose.Document;
export type ArticleContentDocument = ArticleContent & mongoose.Document;

export class Article {
  title: string;
  content: string;
  createAt?: Date;
  modifiedAt?: Date;
  category: string;
  tags: [string] | [];
}

@Schema({ timestamps: true })
export class ArticleMeta {
  @Prop({ required: true })
  @IsNotEmpty()
  title: string;
  //   @Prop({ required: true })
  //   content: string;
  createdAt?: Date;
  updatedAt?: Date;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  tags: [string] | [];
}
@Schema({ timestamps: true })
export class ArticleContent {
  @Prop({ required: true })
  @IsNotEmpty()
  articleId: string;
  @Prop({ required: true })
  content: string;
}

export const ArticleMetaSchema = SchemaFactory.createForClass(ArticleMeta);
export const ArticleContentSchema = SchemaFactory.createForClass(ArticleContent);
