import express from 'express';
import { users } from './users';
// import { AppDataSource } from './data-source';
//
// AppDataSource
//     .initialize()
//     .then(() => {
//         console.log('Data Source has been initialized!');
//     })
//     .catch((err) => {
//         console.error('Error during Data Source initialization:', err);
//     });

const app = express();
console.log(users);

app.listen(3005, () => {
    console.log('server has started🖖🖖🖖');
});
