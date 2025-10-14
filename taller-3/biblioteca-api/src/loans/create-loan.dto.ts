import { IsUUID, IsDateString } from 'class-validator'; // Importación de decoradores de validación

export class CreateLoanDto { // Declaración de la clase DTO para crear préstamos
  @IsUUID() userId: string; // Decorador para validar que userId sea UUID
  @IsUUID() bookId: string; // Decorador para validar que bookId sea UUID
  @IsDateString() loanDate: string; // Decorador para validar que loanDate sea string de fecha válida
}