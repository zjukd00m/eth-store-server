import { IsEthereumAddress } from 'class-validator';
import { CollectibleIdDTO } from './collectible-id.dto';

export class DeleteCollectibleDTO extends CollectibleIdDTO {
    @IsEthereumAddress()
    wallet: string;
}
