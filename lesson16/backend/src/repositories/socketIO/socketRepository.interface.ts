import { IMessage } from '../../entity';

export interface ISocketRepository {
    createMessage(message: Partial<IMessage>): Promise<IMessage>;
}
