import { IsEnum, IsEthereumAddress, IsUUID } from 'class-validator';
import { CollectibleType } from '../types/collectibles.enum';

export class CreateCollectibleDTO {
    @IsEthereumAddress()
    wallet: string;

    @IsEnum(CollectibleType)
    collectibleType: CollectibleType;

    @IsUUID('4')
    itemId: string;
}
