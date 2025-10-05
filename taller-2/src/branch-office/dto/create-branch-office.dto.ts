import { IsString, IsBoolean, IsEnum, IsNotEmpty, Length, Matches } from "class-validator";
import { FunctionType } from "../enums/function-type";
import { Cities } from "../enums/cities";

export class CreateBranchOfficeDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  address: string;

  @IsNotEmpty()
  @IsEnum(Cities, { message: "city must be a valid enum value" })
  city: Cities;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: "phoneNumber must contain only numbers" })
  @Length(7, 15, { message: "phoneNumber must be between 7 and 15 digits" })
  phoneNumber: string;

  @IsEnum(FunctionType, { message: "functionType must be a valid enum value" })
  functionType: FunctionType;

  @IsBoolean()
  isActive: boolean;
}
