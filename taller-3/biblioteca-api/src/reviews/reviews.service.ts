import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

// Servicio que maneja la lógica de las reseñas
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  // Crear una nueva reseña
  async create(dto: CreateReviewDto): Promise<Review> {
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
    if (!book) throw new NotFoundException('Book not found');

    // Busca el usuario solo si se proporciona userId
    const user = dto.userId
      ? await this.userRepo.findOne({ where: { id: dto.userId } })
      : null;

    if (dto.userId && !user) throw new NotFoundException('User not found');

    // Crea y guarda la reseña
    const ent = this.reviewRepo.create({
      book,
      user,
      content: dto.content,
      rating: dto.rating,
    });

    return this.reviewRepo.save(ent);
  }

  // Obtener todas las reseñas
  findAll(): Promise<Review[]> {
    return this.reviewRepo.find();
  }

  // Buscar una reseña por ID
  async findOne(id: number): Promise<Review> {
    const r = await this.reviewRepo.findOne({ where: { id } });
    if (!r) throw new NotFoundException('Review not found');
    return r;
  }

  // Actualizar una reseña existente
  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const r = await this.findOne(id);
    Object.assign(r, dto);
    return this.reviewRepo.save(r);
  }

  // Eliminar una reseña
  async remove(id: number): Promise<void> {
    const r = await this.findOne(id);
    await this.reviewRepo.remove(r);
  }
}
