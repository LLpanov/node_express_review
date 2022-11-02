import 'reflect-metadata';
import SocketIO from 'socket.io';
import * as http from "http";
import express from 'express';
import {createConnection} from 'typeorm';
import fileUpload from 'express-fileupload';
import {apiRouter} from './router';

export const rootDir = __dirname;

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, {cors: {origin: '*'}});

io.on('connection', (socket: any) => {

    console.log(socket.handshake.query);
    socket.on('message:create', (data: any) => {
        console.log(data);
        //one to one
        // socket.emit('message:get-all', {message: [{text: data.message}]})

        ///send all online users
        // io.emit('message:get-all', {message: [{text: data.message}]})

       //send all users avoid sender
        socket.broadcast.emit('message:get-all', 'Test');
    })

    socket.on('join_room', (data: any) => {
        socket.join(data.id)
        //emmit to one user's
        // socket.broadcast.to(data.id).emit(`user_join_room`,{message:`User ${socket.id} joined to room ${data.id}`})
        //emit to all users in room include sender
        io.to(data.id).emit(`user_join_room`, {message: `User ${socket.id} joined to room ${data.id}`})
    })
/// 1-1
    //socket.emit()

    // all include sender
    //io.emit()

    // get all users avoid sender
    //socket.broadcast.emit()

    // to room avoid sender
    //socket.broadcast.to(room_id).emit

    //emit to all users in room include sender
    // io.to(room_id).emit()


});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(apiRouter);

const {PORT} = process.env;

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
    } catch ({message}) {
        // eslint-disable-next-line no-console
        console.log(message);
    }
});
