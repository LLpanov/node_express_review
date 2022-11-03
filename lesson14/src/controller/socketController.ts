import { userRepository } from '../repositories/user/userRepository';
import { IUser } from '../entity';
import { socketService } from '../services/socketService';
import { socketRepository } from '../repositories/socketIO/socketRepository';

class SocketController {
    public async messageCreate(socket: any, io: any, data: any): Promise<void> {
        const { userId } = socket.handshake.query;
        const { firstName } = await userRepository.getUserById(userId) as IUser;
        const { message, room } = data;
        await socketService.getNewMessage(io, room, message, firstName);
        await socketRepository.createMessage({ message, userId });
    }

    public async joinRoom(io: any, socket: any, data: any): Promise<void> {
        const { userId } = socket.handshake.query;

        const { firstName } = await userRepository.getUserById(userId) as IUser;

        socket.join(data.id);
        io.to(data.id)
            .emit('user_join_room', { message: `User ${firstName} joined room ${data.id}` });
    }
}

export const socketController = new SocketController();
