import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() wss: Server;

  handleDisconnect(client: Socket) {
    this.logger.log(`disconnected ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`connected ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.log('initialized');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // client.emit('msgToClient', text);
    return { event: 'msgToClient', data: text };
  }

  // send to everyone
  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, text: string): void {
  //   this.wss.emit('msgToClient', text);
  // }
}
