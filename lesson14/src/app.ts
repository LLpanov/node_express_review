import mongoose from 'mongoose';
import cors from 'cors';
import 'reflect-metadata';
import SocketIO from 'socket.io';
import * as http from 'http';
import express from 'express';
import { createConnection } from 'typeorm';
import fileUpload from 'express-fileupload';
import { apiRouter } from './router';
import { socketController } from './controller';

export const rootDir = __dirname;

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { ordered: '*' } });

io.on('connection', (socket: any) => {
    socket.on('message:create', async (data: any) => socketController.messageCreate(io, socket, data));
    socket.on('join_room', async (data: any) => socketController.joinRoom(io, socket, data));
});
/// 1-1
// socket.emit()

// all include sender
// io.emit()

// get all users avoid sender
// socket.broadcast.emit()

// to room avoid sender
// socket.broadcast.to(room_id).emit

// emit to all users in room include sender
// io.to(room_id).emit()

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(apiRouter);

mongoose.connect('mongodb://localhost:27017/express-node')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

const { PORT } = process.env;

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
        });
});

server.listen(process.env.PORT, async () => {
    // eslint-disable-next-line no-console
    console.log(`Serves has started on Port : ${PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            // eslint-disable-next-line no-console
            console.log('database connect');
            // await cronRun();
        }
    } catch ({ message }) {
        // eslint-disable-next-line no-console
        console.log(message);
    }
});
