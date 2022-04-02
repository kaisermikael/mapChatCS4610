import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatRoomsController } from "server/controllers/chat_rooms.controller";
import { ChatRoom } from "server/entities/chat_room.entity";
import { Message } from "server/entities/message.entity";
import { MessagesGateway } from "server/providers/gateways/messages.gateway";
import { ChatRoomsService } from "server/providers/services/chat_rooms.service";
import { JwtService } from "server/providers/services/jwt.service";
import { MessagesService } from "server/providers/services/messages.service";
import { GuardUtil } from "server/providers/util/guard.util";

@Module({
    imports: [TypeOrmModule.forFeature([ChatRoom, Message])],
    controllers: [ChatRoomsController],
    providers: [ChatRoomsService, MessagesGateway, MessagesService, JwtService, GuardUtil],
    exports: [],
})
export class ChatRoomsModule {

}