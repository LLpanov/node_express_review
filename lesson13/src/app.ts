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
const io = SocketIO(server,{cors:{origin:'*'}});

io.on('connection',(socket:any)=>{
    console.log('--------------------')
    console.log(socket.handshake.query);
    console.log('-----------------------')
})

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRouter);

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
