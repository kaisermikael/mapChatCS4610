import { UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayJwtBody } from 'server/decorators/gateway_jwt_body.decorator';
import { GatewayAuthGuard } from '../guards/gatewayauth.guard';
import { JwtService } from '../services/jwt.service';
import { MessagesService } from '../services/messages.service';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Message } from 'server/entities/message.entity';

class ChatMessagePayload {
    contents: string;
    userName: string;
    userId: string;
}

@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private messagesService: MessagesService, private jwtService: JwtService) {}

    async handleConnection(client: any, ...args: any[]) {
        try {
            const jwt = client.handshake.auth.token;
            this.jwtService.parseToken(jwt);
            client.join(client.handshake.query.chatRoomId as unknown as string);
            const messages = await this.messagesService.findAllForRoom(client.handshake.query.chatRoomId);
            client.emit('initial-messages', messages);
        } catch (e) {
            throw new WsException('Invalid Token');
        }
    }

    handleDisconnect(client: any) {
        console.log('Client Disconnected');
    }

    @SubscribeMessage('message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: ChatMessagePayload,
        @GatewayJwtBody() jwtBody: JwtBodyDto,
    ) {
        console.log(payload);
        let message = new Message();
        message.contents = payload.contents;
        message.userName = payload.userName;
        message.userId = jwtBody.userId;
        message.chatRoomId = parseInt(client.handshake.query.chatRoomId as unknown as string, 10);
        message = await this.messagesService.create(message);
        this.server.to(`${message.chatRoomId}`).emit('message', message);
    }
}