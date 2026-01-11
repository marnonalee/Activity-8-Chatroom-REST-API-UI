import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: User })
  signup(@Body() dto: CreateUserDto): Promise<User> {
    console.log('SIGNUP DTO:', dto); // 🔍 debug
    return this.usersService.signup(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    schema: {
      example: { token: 'string' },
    },
  })
  login(@Body() dto: LoginUserDto): Promise<{ token: string }> {
    return this.usersService.login(dto);
  }
}
