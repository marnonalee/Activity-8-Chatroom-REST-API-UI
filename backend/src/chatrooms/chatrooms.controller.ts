import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatRoomsService } from './chatrooms.service';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Chatrooms')
@Controller('chatrooms')
export class ChatRoomsController {
  constructor(private service: ChatRoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chatroom' })
  @ApiResponse({ 
    status: 201, 
    description: 'Chatroom created successfully', 
    schema: { example: { id: 1, name: 'General Chat' } } 
  })
  create(@Body() dto: CreateChatRoomDto) {
    return this.service.create(dto.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all chatrooms' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of chatrooms', 
    schema: { example: [
      { id: 1, name: 'General Chat' },
      { id: 2, name: 'Tech Talk' }
    ] } 
  })
  findAll() {
    return this.service.findAll();
  }
}
