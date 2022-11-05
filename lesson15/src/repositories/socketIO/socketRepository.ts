import { EntityRepository, getManager } from 'typeorm';
import { IMessage, Message } from '../../entity';
import { ISocketRepository } from './socketRepository.interface';

@EntityRepository(Message)
class SocketRepository implements ISocketRepository {
    public async createMessage(message:Partial<IMessage>):Promise<IMessage> {
        return getManager().getRepository(Message).save(message);
    }
}

export const socketRepository = new SocketRepository();
