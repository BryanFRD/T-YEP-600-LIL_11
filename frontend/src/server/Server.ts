import { ClientChannel, geckos } from '@geckos.io/client';
import getEnvValue from '../utils/environment';
import logger from '../logger/logger';
import ServerEvent from './ServerEvent';
import ServerEventPayloads from './ServerEventPayload';

export default class Server {
  
  private static server: Server | null = null;
  
  private channel: ClientChannel | null = null;
  private eventHandlers: { [key in ServerEvent]?: ((payload: ServerEventPayloads[key]) => void)[] } = {};
  
  ping: number = -1;
  
  constructor() {
    const server = geckos({
      url: getEnvValue('SERVER_URL'),
      port: parseInt(getEnvValue('SERVER_PORT')!),
      iceServers: [
        {
          urls: getEnvValue('STUN_URL')!
        },
        {
          urls: getEnvValue('TURN_URL')!,
          username: getEnvValue('TURN_USERNAME')!,
          credential: getEnvValue('TURN_CREDENTIAL')!
        }
      ]
    });
    
    server.onConnect(error => {
      if(error){
        logger.error('Failed to connect to the server:', error);
        return;
      }
      
      this.channel = server;
      
      Object.entries(ServerEvent).forEach(value => {
        const event = value[1];
        server.on(event, (data) => {
          this.handleEvent(event, data as ServerEventPayloads[typeof event]);
        })
      });
    });
    
    this.handlePing();
  }
  
  addEventHandler<T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ){
    if(!this.eventHandlers[event]){
      this.eventHandlers[event] = [];
    }
    
    this.eventHandlers[event].push(handler);
  }
  
  removeEventHandler<T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ){
    if(!this.eventHandlers[event]){
      return;
    }
    
    const index = this.eventHandlers[event].indexOf(handler);
    this.eventHandlers[event].splice(index, 1);
  }
  
  emit<T extends ServerEvent>(
    event: T,
    data: ServerEventPayloads[T]
  ){
    if(this.channel){
      this.channel.emit(event, data);
    } else {
      logger.error('Channel is not defined!');
    }
  }
  
  private handleEvent<T extends ServerEvent>(
    event: T,
    data: ServerEventPayloads[T]
  ){
    if(this.eventHandlers[event]){
      this.eventHandlers[event].forEach(handler => handler(data));
    }
  }
  
  private handlePing(){
    this.addEventHandler(ServerEvent.PONG, (data) => {
      this.ping = Date.now() - data.date;
    });
    
    setInterval(() => {
      this.emit(ServerEvent.PING, { date: Date.now() });
    }, 1000);
  }
  
  static getInstance(): Server {
    if(this.server == null){
      this.server = new Server();
    }
    
    return this.server;
  }
  
}