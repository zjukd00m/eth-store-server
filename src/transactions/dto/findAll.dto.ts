import { PartialType } from '@nestjs/mapped-types';
import { TransactionIdDTO } from './transaction-id.dto';
import { IsEthereumAddress } from 'class-validator';

export class FindAllTransactionsDTO extends PartialType(TransactionIdDTO) {
    @IsEthereumAddress()
    address: string;
}
