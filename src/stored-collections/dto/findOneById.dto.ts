import { IsUUID } from 'class-validator';

export class FindOneStoredCollectionById {
    @IsUUID('4')
    id: string;
}
