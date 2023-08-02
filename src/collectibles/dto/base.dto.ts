import { IsEthereumAddress } from 'class-validator';

export class BaseCollectibleDTO {
    @IsEthereumAddress()
    address: string;
}
