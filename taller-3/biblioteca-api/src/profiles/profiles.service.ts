import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../users/user.entity';

// Servicio para manejar la lógica de los perfiles
@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Crear un nuevo perfil
  async create(dto: CreateProfileDto): Promise<Profile> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const ent = this.profileRepo.create({
      nickname: dto.nickname,
      bio: dto.bio,
      avatarUrl: dto.avatarUrl,
      user,
    });
    return this.profileRepo.save(ent);
  }

  // Obtener todos los perfiles
  findAll(): Promise<Profile[]> {
    return this.profileRepo.find();
  }

  // Buscar un perfil por ID
  async findOne(id: number): Promise<Profile> {
    const p = await this.profileRepo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Profile not found');
    return p;
  }

  // Actualizar un perfil existente
  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.profileRepo.save(p);
  }

  // Eliminar un perfil
  async remove(id: number): Promise<void> {
    const p = await this.findOne(id);
    await this.profileRepo.remove(p);
  }

  // Buscar perfil por el ID del usuario
  findByUserId(userId: number): Promise<Profile | null> {
    return this.profileRepo.findOne({ where: { user: { id: userId } } });
  }
}
