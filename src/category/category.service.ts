import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
  @InjectModel('Category') private categoryModel: Model<CategoryDocument>;

  getCategories() {
    return this.categoryModel.find().exec();
  }

  create(category: CategoryDocument) {
    const res = this.categoryModel.insertMany(category);
    return res;
  }

  patchCategory(id: string, category: CategoryDocument) {
    return this.categoryModel.findByIdAndUpdate(id, category, { new: true });
  }

  findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }
}
