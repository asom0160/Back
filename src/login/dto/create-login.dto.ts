import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    userPassWord: string;
}