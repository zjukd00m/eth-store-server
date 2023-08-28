import { IsUUID } from 'class-validator';

export default class UpdateStoredCollectionDTO {
    @IsUUID('4')
    id: string;
}
