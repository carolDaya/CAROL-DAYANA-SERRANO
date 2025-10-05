import { IsString, IsNotEmpty, IsDateString, IsNumber, IsPositive } from 'class-validator';

export class MaintenanceDto {
  @IsString()
  @IsNotEmpty({ message: 'description cannot be empty' })
  description: string;

  @IsDateString({}, { message: 'date must be a valid ISO date string (e.g., 2025-10-04)' })
  date: string;

  @IsNumber()
  @IsPositive({ message: 'cost must be a positive number' })
  cost: number;
}
