import { DataSource } from 'typeorm';
import { User } from './users.entity';
import { USERS_REPOSITORY } from './users.constants';
import { DATA_SOURCE } from '../database/database.constants';

export const usersProviders = [
    {
        provide: USERS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATA_SOURCE],
    },
];
