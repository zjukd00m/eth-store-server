import { IsUUID } from 'class-validator';

export class FindOneStoredColletibleByIdDTO {
    @IsUUID('4')
    id: string;
}
