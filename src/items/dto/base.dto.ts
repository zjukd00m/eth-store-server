import { IsUUID } from 'class-validator';

export class BaseItemDTO {
    @IsUUID('4')
    id: string;
}
