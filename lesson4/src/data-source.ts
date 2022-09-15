import { DataSource } from 'typeorm';

const myDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'express_okten',
    synchronize: true,
    migrationsRun: true,
    logging: false,
    entities: [],
    subscribers: [],
    migrations: ['src/migrations/**/*{.ts,.js}'],

});
export default myDataSource;
