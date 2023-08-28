import { IsUUID } from 'class-validator';

export class DeleteStoredCollectibleDTO {
    @IsUUID('4')
    id: string;
}
