import { IsEthereumAddress, IsNumber } from 'class-validator';

export class CreateCollectibleBodyDTO {
    @IsEthereumAddress()
    address: string;

    @IsNumber()
    supply?: number;
}

export class CreateCollectibleDTO extends CreateCollectibleBodyDTO {
    @IsEthereumAddress()
    wallet: string;
}
