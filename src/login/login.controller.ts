import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UnauthorizedException, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createLoginDto: CreateLoginDto) {
    try {
      const newUser = await this.loginService.create(createLoginDto);
      return { 
        success: true,
        message: '회원가입이 성공적으로 완료되었습니다.',
        user: newUser 
      };
    } catch (error) {
      throw new UnauthorizedException('회원가입에 실패했습니다: ' + error.message);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { userId: string; userPassWord: string }) {
    try {
      const user = await this.loginService.validateUser(loginDto.userId, loginDto.userPassWord);
      if (!user) {
        throw new UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
      return {
        success: true,
        message: '로그인이 성공적으로 완료되었습니다.',
        user: user
      };
    } catch (error) {
      throw new UnauthorizedException('로그인에 실패했습니다: ' + error.message);
    }
  }

  @Get()
  async findAll() {
    return await  this.loginService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return  await this.loginService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await  this.loginService.remove(+id);
  }
}
