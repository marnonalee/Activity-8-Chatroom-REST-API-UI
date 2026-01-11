import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRoomDto {
  @ApiProperty({
    description: 'Name of the chatroom',
    example: 'General Chat',
  })
  @IsString()
  name: string;
}
