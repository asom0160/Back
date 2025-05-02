import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Controller('projects')
export class ProjectsController {
  constructor(@InjectRepository(Project) private projectsRepoistory: Repository<Project>,
) {}

 @Post()
 async create(@Body() createprojectDto: CreateProjectDto) {
   const newUser = this.projectsRepoistory.create(createprojectDto); // DTO를 기반으로 엔티티 생성
   return await this.projectsRepoistory.save(newUser); // 데이터베이스에 저장
 }
 
 @Get()
   findAll() {
     return this.projectsRepoistory.find();
   }
 
   @Get(':id')
   findOne(@Param('id') id: string) {
     return this.projectsRepoistory.findOne({ where: { id: +id } });
   }
 
   @Delete(':id')
   remove(@Param('id') id: string) {
     return this.projectsRepoistory.delete(+id);
   }
 }
