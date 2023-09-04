import { IsUUID } from 'class-validator';

export class CollectibleIdDTO {
    @IsUUID('4')
    id: string;
}
