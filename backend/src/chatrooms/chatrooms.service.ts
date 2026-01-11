import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private repo: Repository<ChatRoom>,
  ) {}

  create(name: string) {
    const room = this.repo.create({ name });
    return this.repo.save(room);  // Saves to database
  }

  findAll() {
    return this.repo.find();  // Returns all chatrooms
  }
}
