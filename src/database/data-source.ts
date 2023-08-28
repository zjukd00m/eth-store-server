import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
// import { DATA_SOURCE } from './database.contants';
import { User } from '../users/users.entity';
import { Item } from 'src/items/items.entity';
import { Collectible } from 'src/collectibles/collectibles.entity';
import { Transaction } from 'src/transactions/transactions.entity';
import { StoredCollection } from 'src/stored-collections/stored-collections.entity';
import { StoredCollectible } from 'src/stored-collectible/stored-collectible.entity';

dotenv.config({
    path: path.join(__dirname, './../../.dev.env'),
});

console.log({
    path: path.join(__dirname, './../../.dev.env'),
});

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    // host: process.env.POSTGRES_HOST,
    // port: +process.env.POSGRES_PASSWORD,
    // username: process.env.POSTGRES_USERNAME,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        User,
        Item,
        Transaction,
        Collectible,
        StoredCollection,
        StoredCollectible,
    ],
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
