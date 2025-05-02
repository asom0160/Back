import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {}

  // 회원 추가 (회원가입)
  async create(createLoginDto: CreateLoginDto): Promise<Login> {
    // 중복된 userId 확인
    const existingUser = await this.loginRepository.findOneBy({
      userId: createLoginDto.userId,
    });
    if (existingUser) {
      throw new BadRequestException(`User with ID ${createLoginDto.userId} already exists`);
    }

    // DTO -> Entity 변환 및 저장
    const newLogin = this.loginRepository.create(createLoginDto);
    return await this.loginRepository.save(newLogin);
  }

  async validateUser(userId: string, userPassWord: string): Promise<Login | null> {
    const user = await this.loginRepository.findOneBy({ userId, userPassWord });
    if (!user) {
      return null; // 사용자 정보가 없으면 null 반환
    }
    return user; // 사용자 정보 반환
  }

  // 모든 회원 조회
  async findAll(): Promise<Login[]> {
    return await this.loginRepository.find();
  }

  // 특정 회원 조회
  async findOne(id: number): Promise<Login> {
    const login = await this.loginRepository.findOneBy({ id });
    if (!login) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return login;
  }

  // 회원 삭제
  async remove(id: number): Promise<void> {
    const result = await this.loginRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}