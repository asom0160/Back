import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './entities/projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Projects> {
    const newProject = this.projectsRepository.create(createProjectDto);
    return await this.projectsRepository.save(newProject);
  }

  findAll(): Promise<Projects[]> {
    return this.projectsRepository.find();
  }

  findOne(id: number): Promise<Projects | null> {
    return this.projectsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Projects> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const updated = Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
