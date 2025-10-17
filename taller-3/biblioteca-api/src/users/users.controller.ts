import { 
    Controller, 
    Get, Post, Patch, Delete, 
    Param, Body, UseGuards, 
    HttpCode, HttpStatus 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { User } from './user.entity'; 

@Controller('users')
@UseGuards(JwtAuthGuard) 
export class UsersController {
  
  constructor(private readonly svc: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.svc.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto): Promise<User> { 
    return this.svc.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> { 
    return this.svc.update(id, dto);
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  remove(@Param('id') id: string): Promise<{ deleted: true }> {
    return this.svc.remove(id);
  }
}