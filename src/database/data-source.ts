import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
// import { DATA_SOURCE } from './database.contants';

dotenv.config({
    path: path.join(__dirname, './../../.dev.env'),
});

console.log({
    path: path.join(__dirname, './../../.dev.env'),
});

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    // url: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSGRES_PASSWORD,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: ['./dist/src/**/*.entity.js'],
    migrations: ['./dist/src/database/migrations/*.js'],
    subscribers: [],
};

export const AppDataSource = new DataSource(dataSourceOptions);

// export const databaseProviders = [
//     {
//         provide: DATA_SOURCE,
//         useFactory: async () => {
//             const dataSource = new DataSource(dataSourceOptions);
//             return dataSource.initialize();
//         },
//     },
// ];
