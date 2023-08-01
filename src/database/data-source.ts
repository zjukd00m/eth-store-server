import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
// import { DATA_SOURCE } from './database.contants';
import { User } from '../users/users.entity';
import { Item } from 'src/items/items.entity';
import { Collectible } from 'src/collectibles/collectibles.entity';

dotenv.config({
    path: path.join(__dirname, './../../.dev.env'),
});

console.log({
    path: path.join(__dirname, './../../.dev.env'),
});

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.POSTGRES_DB_URI,
    synchronize: true,
    logging: true,
    entities: [User, Item, Collectible],
    migrations: ['./dist/src/database/migrations/*.js}'],
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
