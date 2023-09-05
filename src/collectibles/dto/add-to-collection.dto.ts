import { IsUUID } from 'class-validator';

export class AddToCollectionDTO {
    @IsUUID('4')
    collectionId: string;

    @IsUUID('4')
    collectibleId: string;
}
