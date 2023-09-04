import { IsUUID } from 'class-validator';

export class TransactionIdDTO {
    @IsUUID('4')
    id: string;
}
