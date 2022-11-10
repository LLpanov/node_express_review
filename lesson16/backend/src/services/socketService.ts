class SocketService {
    public getNewMessage(io: any, room: number, message: string, firstName: string) {
        if (room === 0) {
            io.emit('message:get-new-message', { message, firstName });
        } else if (room === 1) {
            io.to(room)
                .emit('message:get-new-message', {
                    message,
                    firstName,
                });
        } else if (room === 2) {
            io.to(room).emit('message:get-new-message', {
                message,
                firstName,
            });
        } else if (room === 3) {
            io.to(room)
                .emit('message:get-new-message', {
                    message,
                    firstName,
                });
        }
    }
}

export const socketService = new SocketService();
