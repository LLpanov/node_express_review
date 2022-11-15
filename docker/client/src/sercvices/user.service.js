import { axioxSercvice } from './axiox.sercvice';
import { urls } from '../constants';

const userService ={

    create:(user) => axioxSercvice.post(urls.users, user),
    getByEmail: (email) => axioxSercvice.get(`${urls.users}/${email}`)


}
export { userService };
