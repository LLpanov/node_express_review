import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import { apiRouter } from './router';
import { config } from './config';


export const rootDir = __dirname;
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(apiRouter);



const { PORT } = config;

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
        });
});

app.listen(PORT, async () => {
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
