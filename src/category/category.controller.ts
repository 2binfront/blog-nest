import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'src/auth/constants';
import { CategoryDocument } from './category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Public()
  @Get()
  getCategory() {
    return this.categoryService.getCategories();
  }

  @Post()
  createCategory(@Body() category: CategoryDocument) {
    return this.categoryService.create(category);
  }

  @Patch()
  updateCategory(@Param() id: string, @Body() category: CategoryDocument) {
    return this.categoryService.patchCategory(id, category);
  }
}
