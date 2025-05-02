import { IsNotEmpty, IsString } from "class-validator"

export class CreateProjectDto {
     @IsString()
        @IsNotEmpty()
        image:string
        @IsString()
      @IsNotEmpty()
        url:string
        @IsString()
      @IsNotEmpty()
        title:string
        @IsString()
      @IsNotEmpty()
      github:string
}
