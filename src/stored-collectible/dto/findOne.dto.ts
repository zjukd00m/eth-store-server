import { IsUUID } from 'class-validator';

export default class FindOneStoredColletibleByIdDTO {
    @IsUUID('4')
    id: string;
}
