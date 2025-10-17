import { IsString, IsOptional, IsUUID, IsInt, Min, IsArray, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString() 
  @IsNotEmpty()
  title: string; 

  @IsOptional() 
  @IsString() 
  isbn?: string; 

  @IsOptional() 
  @IsInt() 
  @Min(0) 
  copiesAvailable?: number; 

  @IsOptional() 
  @IsString() 
  description?: string; 

  // Foreign key validation (Category must exist in the database)
  @IsOptional() 
  @IsUUID() 
  categoryId?: string; 

  // Array of UUIDs for many-to-many relationship
  @IsOptional() 
  @IsArray() 
  @IsUUID(undefined, { each: true }) // Validates that each element in the array is a UUID
  authorIds?: string[]; 
}