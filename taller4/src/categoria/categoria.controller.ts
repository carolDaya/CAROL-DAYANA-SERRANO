import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiDefaultResponses } from '../common/decorators/ApiDefaultResponses';
import {
  DefaultResponse,
  DefaultSuccessResponse,
} from '../common/interfaces/IResponse';
import { Categoria } from './categoria.entity';
import { DefaultCreateDoc } from '../common/decorators/DefaultCreateDoc';
import { DefaultFindAllDoc } from '../common/decorators/DefaultFindAllDoc';
import { DefaultFindOneDoc } from '../common/decorators/DefaultFindOneDoc';
import {
  CategoriaSingularExample,
  CategoriaArrayExample,
} from './docs/CategoriaExample';
import { DefaultUpdateDoc } from '../common/decorators/DefaultUpdateDoc';
import { DefaultDeleteDoc } from '../common/decorators/DefaultDeleteDoc';

// Define el grupo de endpoints en Swagger
@ApiTags('Categoría')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly service: CategoriaService) {}

  // Crear una nueva categoría
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @DefaultCreateDoc(
    'Categoría',
    CreateCategoriaDto,
    Categoria,
    CategoriaSingularExample,
  )
  create(@Body() dto: CreateCategoriaDto) {
    return this.service.create(dto);
  }

  // Obtener todas las categorías
  @Get()
  @DefaultFindAllDoc('Categoría', Categoria, CategoriaArrayExample)
  findAll() {
    return this.service.findAll();
  }

  // Obtener una categoría por ID
  @Get(':id')
  @DefaultFindOneDoc('Categoría', Categoria, CategoriaSingularExample)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // Actualizar una categoría por ID
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @DefaultUpdateDoc(
    'Categoría',
    UpdateCategoriaDto,
    Categoria,
    CategoriaSingularExample,
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.service.update(id, dto);
  }

  // Eliminar una categoría por ID
  @Delete(':id')
  @DefaultDeleteDoc('Categoría')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
