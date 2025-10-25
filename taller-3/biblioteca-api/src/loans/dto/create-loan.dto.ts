import { IsDateString, IsInt } from 'class-validator';

export class CreateLoanDto {

  // ID del usuario que toma el préstamo
  @IsInt()
  userId: number;

  // ID del libro prestado
  @IsInt()
  bookId: number;

  // Fecha en que se realiza el préstamo
  @IsDateString()
  loanDate: string;

  // Fecha prevista de devolución
  @IsDateString()
  returnDate: string;

}
