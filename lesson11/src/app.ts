import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router';
import { cronRun } from './cron';

export const rootDir = __dirname;

const app = express();
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

app.listen(process.env.PORT, async () => {
    // eslint-disable-next-line no-console
    console.log(`Serves has started on Port : ${PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            // eslint-disable-next-line no-console
            console.log('database connect');
            await cronRun();
        }
    } catch ({ message }) {
        // eslint-disable-next-line no-console
        console.log(message);
    }
});
