import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto'; 
import { UpdateCategoryDto } from './dto/update-category.dto'; 

@Controller('categories')
export class CategoriesController {
  constructor(private svc: CategoriesService) {}

  @Get() findAll() { return this.svc.findAll(); }
  
  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  
  @Post() create(@Body() dto: CreateCategoryDto) { 
    return this.svc.create(dto); 
  }

  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) { 
    return this.svc.update(id, dto); 
  }
  
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}