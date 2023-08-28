import { IsUUID } from 'class-validator';

export class DeleteStoredCollectionDTO {
    @IsUUID('4')
    id: string;
}
