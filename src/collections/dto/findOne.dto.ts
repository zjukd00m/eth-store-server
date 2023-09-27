import { IsEthereumAddress, IsUUID } from 'class-validator';

export class FindOneCollectionDTO {
    @IsUUID('4')
    id: string;

    @IsEthereumAddress()
    wallet: string;
}
