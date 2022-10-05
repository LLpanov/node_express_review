import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(7777, async () => {
    console.log('Serves has started on PORT: http://localhost:7777');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('database connect');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
