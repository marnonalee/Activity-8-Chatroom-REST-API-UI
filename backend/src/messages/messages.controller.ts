import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message in a chatroom' })
  @ApiResponse({ 
    status: 201, 
    description: 'Message sent successfully', 
    schema: { example: { id: 1, sender: 'JohnDoe', content: 'Hello', chatroomId: 1 } } 
  })
  create(@Body() dto: CreateMessageDto) {
    return this.service.create(dto.sender, dto.content, dto.chatroomId);
  }

  @Get(':chatroomId')
  @ApiOperation({ summary: 'Get all messages from a chatroom' })
  @ApiParam({ name: 'chatroomId', type: Number, description: 'ID of the chatroom' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of messages', 
    schema: { example: [
      { id: 1, sender: 'JohnDoe', content: 'Hello', chatroomId: 1 },
      { id: 2, sender: 'Jane', content: 'Hi!', chatroomId: 1 }
    ] } 
  })
  getMessages(@Param('chatroomId') id: number) {
    return this.service.findByRoom(id);
  }
}
