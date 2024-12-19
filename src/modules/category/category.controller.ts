import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'src/modules/auth/constants';
import { Category } from 'src/dtos';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Public()
  @Get()
  getCategory() {
    return this.categoryService.getCategories();
  }

  @Post()
  createCategory(@Body() category: Category) {
    return this.categoryService.create(category);
  }

  @Patch()
  updateCategory(@Param() id: string, @Body() category: Category) {
    return this.categoryService.patchCategory(+id, category);
  }

  @Delete()
  deleteCategory(@Param() id: string) {
    return this.categoryService.delete(+id);
  }
}
