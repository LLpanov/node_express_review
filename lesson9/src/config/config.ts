import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 1111,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,

    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,

    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,

    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_PASSWORD: process.env.ROOT_PASSWORD,
};
