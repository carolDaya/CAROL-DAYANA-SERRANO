import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class ClientDto {
  @IsString()
  @IsNotEmpty({ message: 'name cannot be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'lastName cannot be empty' })
  lastName: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsPhoneNumber('CO', { message: 'phoneNumber must be a valid Colombian phone number' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  address?: string;
}
