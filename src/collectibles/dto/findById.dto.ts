import { IsUUID } from 'class-validator';

export class FindCollectibleById {
    @IsUUID('4')
    id: string;
}
