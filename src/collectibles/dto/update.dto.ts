import { IsEthereumAddress } from 'class-validator';
import { BaseCollectibleDTO } from './base.dto';

export class UpdateCollectibleDTO extends BaseCollectibleDTO {
    @IsEthereumAddress()
    wallet: string;
}

export class UpdateCollectibleParamsDTO extends BaseCollectibleDTO {}

export class UpdateCollectibleBodyDTO {
    @IsEthereumAddress()
    wallet: string;
}
