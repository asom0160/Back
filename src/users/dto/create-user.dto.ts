import { IsNotEmpty, IsString, IsOptional, IsDate, IsInt } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsOptional() // 선택적 필드
  likes?: number;

  @IsDate()
  @IsOptional() // 선택적 필드
  createdAt?: Date;
}