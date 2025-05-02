import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Login } from "./entities/login.entity";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";

@Module({
  imports: [TypeOrmModule.forFeature([Login])], // Login 엔티티 등록
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}