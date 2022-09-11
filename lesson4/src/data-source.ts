import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'okten_express',
    synchronize: false,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    subscribers: [],
    migrations: ['src/migrations/**/*.ts'],

});

myDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
