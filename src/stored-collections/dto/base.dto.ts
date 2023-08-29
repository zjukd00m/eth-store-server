import { IsUUID } from 'class-validator';

export default class StoredCollectionIdDTO {
    @IsUUID('4')
    id: string;
}
