import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 1111,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,

};
