import { IsUUID } from 'class-validator';

export class DeleteCollectionDTO {
    @IsUUID('4')
    id: string;
}
