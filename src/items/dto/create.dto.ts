import { IsEthereumAddress } from 'class-validator';
import { BaseItemDTO } from './base.dto';

export class CreateItemDTO extends BaseItemDTO {
    @IsEthereumAddress()
    wallet: string;
}
