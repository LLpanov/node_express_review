import express from 'express';
import 'reflect-metadata';
import { users } from './users';
import myDataSource from './data-source';

myDataSource.initialize().then(() => {
    const app = express()
    app.use(express.json());
    console.log(users);
    return app.listen(3005, () => {
        console.log('server has started🖖🖖🖖');
    });
})


