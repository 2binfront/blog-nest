import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
export type CategoryDocument = Category & mongoose.Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  @IsNotEmpty()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
