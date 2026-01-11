import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user', example: 'Myls' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email of the user', example: 'myls@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (min 6 chars)', example: 'secret123' })
  @IsString()
  @MinLength(6)
  password: string;
}
