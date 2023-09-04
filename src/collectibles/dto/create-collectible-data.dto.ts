import { IsNumber } from 'class-validator';

export class CreateCollectibleDataDTO {
    @IsNumber()
    id: number;
}
