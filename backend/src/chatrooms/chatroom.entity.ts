import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; 
import { Message } from '../messages/message.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Message, message => message.chatroom)
  messages: Message[];
}
