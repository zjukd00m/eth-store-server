import { IsUUID } from 'class-validator';

export class FindOneCollectionDTO {
    @IsUUID('4')
    id: string;
}
