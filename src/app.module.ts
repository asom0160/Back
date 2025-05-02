import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { Project } from "./projects/entities/project.entity";
import { UsersModule } from "./users/users.module";
import { ProjectsModule } from "./projects/projects.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from './login/login.module';
import { Login } from "./login/entities/login.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "projects", // DB 이름
      synchronize: true, // 개발 환경에서만 true (자동 테이블 생성)
      entities: [User, Project,Login], // 전체 엔티티 등록
    }),
    UsersModule,
    ProjectsModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}