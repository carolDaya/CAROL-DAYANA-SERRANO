import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; 
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly repo: Repository<User>
  ) {}

  /**
   * Finds all users.
   * The password is excluded by default if { select: false } is set in the entity.
   */
  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  /**
   * Finds a single user by ID. Throws NotFoundException if not found.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  /**
   * Creates a new user using validated data from CreateUserDto.
   */
  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10); 
    const user = this.repo.create({ 
        ...data, 
        password: hashedPassword 
    }); 
    return this.repo.save(user);
  }

  /**
   * Updates an existing user with partial data from UpdateUserDto.
   */
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); 
    Object.assign(user, data); 
    return this.repo.save(user);
  }

  /**
   * Removes a user by ID. Throws NotFoundException if no user is affected.
   */
  async remove(id: string): Promise<{ deleted: true }> {
    const res = await this.repo.delete(id);
    
    // Check if any row was affected
    if (res.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    
    return { deleted: true };
  }
}
