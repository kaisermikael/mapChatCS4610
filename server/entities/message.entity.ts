import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatRoom } from "./chat_room.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chatRoomId: number;

    @Column()
    userId: number;

    @Column()
    contents: string;

    @Column()
    userName: string;

    @ManyToOne((type) => ChatRoom, (chatRoom) => chatRoom.messages)
    chatRoom: ChatRoom;
    
}