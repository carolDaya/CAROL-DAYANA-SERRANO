import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'; // Importación de decoradores y excepciones de NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importación del decorador para inyectar repositorios
import { JwtService } from '@nestjs/jwt'; // Importación del servicio JWT
import { Repository } from 'typeorm'; // Importación de Repository para operaciones de base de datos
import * as bcrypt from 'bcryptjs'; // Importación de bcrypt para hashing de contraseñas
import { User } from '../users/user.entity'; // Importación de la entidad User

@Injectable() // Decorador que marca como servicio inyectable
export class AuthService { // Declaración de la clase AuthService
  constructor( // Declaración del constructor con dependencias inyectadas
    @InjectRepository(User) private usersRepo: Repository<User>, // Inyección del repositorio de usuarios
    private jwtService: JwtService, // Inyección del servicio JWT
  ) {}

  async register(name: string, email: string, password: string) { // Declaración del método para registrar usuarios
    const existing = await this.usersRepo.findOne({ where: { email } }); // Consulta para buscar usuario por email
    if (existing) throw new ConflictException('Email already registered'); // Validación de que el email no está registrado

    const hashed = await bcrypt.hash(password, 10); // Operación de hashear contraseña con 10 salt rounds
    const newUser = this.usersRepo.create({ name, email, password: hashed }); // Creación de instancia de usuario
    const saved = await this.usersRepo.save(newUser); // Operación de guardar usuario en la base de datos

    const { password: _p, ...safeUser } = saved; // Eliminación de la contraseña del objeto retornado
    return safeUser; // Retorno del usuario sin contraseña
  }

  async validateUser(email: string, password: string) { // Declaración del método para validar credenciales
    const user = await this.usersRepo.findOne({ where: { email } }); // Consulta para buscar usuario por email
    if (!user) throw new UnauthorizedException('Invalid credentials'); // Validación de que el usuario existe

    const valid = await bcrypt.compare(password, user.password); // Comparación de contraseña hasheada
    if (!valid) throw new UnauthorizedException('Invalid credentials'); // Validación de que la contraseña coincide

    return user; // Retorno del usuario si las credenciales son válidas
  }

  async login(user: User) { // Declaración del método para login que genera JWT
    const payload = { sub: user.id, email: user.email }; // Creación del payload del token con id y email
    return { access_token: this.jwtService.sign(payload) }; // Retorno del objeto con token JWT firmado
  }

  async findById(id: string) { // Declaración del método para buscar usuario por ID
    const user = await this.usersRepo.findOne({ where: { id } }); // Consulta para buscar usuario por ID
    if (!user) throw new UnauthorizedException('User not found'); // Validación de que el usuario existe
    return user; // Retorno del usuario encontrado
  }
}