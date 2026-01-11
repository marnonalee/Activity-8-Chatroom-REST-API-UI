import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'Username of the sender', example: 'JohnDoe' })
  @IsString()
  sender: string;

  @ApiProperty({ description: 'Content of the message', example: 'Hello everyone!' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'ID of the chatroom', example: 1 })
  @IsNumber()
  chatroomId: number;
}
