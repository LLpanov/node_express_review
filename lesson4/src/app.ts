import express from 'express';
import { users } from './users';

const app = express();
console.log(users);

app.listen(3200, () => {
    console.log('server has started🖖🖖🖖');
});
