import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
export type TagDocument = Tag & mongoose.Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true })
  @IsNotEmpty()
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
