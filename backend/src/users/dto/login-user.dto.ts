import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'Email of the user', example: 'myls@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user', example: 'secret123' })
  @IsString()
  password: string;
}
