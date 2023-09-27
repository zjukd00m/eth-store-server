import { IsEthereumAddress, IsNumberString } from 'class-validator';

export class CreateTransactionDTO {
    @IsEthereumAddress()
    address: string;

    @IsEthereumAddress()
    wallet: string;
}
