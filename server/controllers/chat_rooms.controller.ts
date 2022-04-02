import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
import { ChatRoom } from "server/entities/chat_room.entity";
import { ChatRoomsService } from "server/providers/services/chat_rooms.service";
import * as crypto from 'crypto';

class ChatRoomBody {
    name: string;
    latitude: number;
    longitude: number;
}

@Controller()
export class ChatRoomsController {

    constructor( private chatRoomsService: ChatRoomsService ) {}

    @Get('/chat_rooms')
        async index() {
            const chatRooms = await this.chatRoomsService.findAll();
            return { chatRooms };
        }

    @Get('/chat_rooms/:id')
    async show(@Param('id') id: string) {
        const chatRoom = await this.chatRoomsService.findOne(parseInt(id));
        return { chatRoom };
    }

    @Post('/chat_rooms')
    async create(@Body() body: ChatRoomBody){

        let chatRoom = new ChatRoom();
        chatRoom.name = body.name;
        chatRoom.latitude = body.latitude;
        chatRoom.longitude = body.longitude;
        chatRoom.roomkey = crypto.randomBytes(8).toString('hex');
        chatRoom = await this.chatRoomsService.create(chatRoom);
        return { chatRoom };
    }

    @Delete('/chat_rooms/:id')
    public async destroy(@Param('id') id: string) {
        const task = await this.chatRoomsService.findOne(parseInt(id, 10));
        this.chatRoomsService.delete(task);
        return { success: true };
    }
}