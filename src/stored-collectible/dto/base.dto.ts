import { IsUUID } from 'class-validator';

export default class StoredCollectibleIDDTO {
    @IsUUID('4')
    id: string;
}
