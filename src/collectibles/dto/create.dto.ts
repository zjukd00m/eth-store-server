import { IsEnum, IsEthereumAddress, IsUUID } from 'class-validator';
import { CollectibleType } from '../types/collectibles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectibleDTO {
    @ApiProperty()
    @IsEthereumAddress()
    wallet: string;

    @ApiProperty({
        enum: CollectibleType,
        default: CollectibleType.ERC721,
        description: 'The contract type of the collectible (ERC721 or ERC1155)',
    })
    @IsEnum(CollectibleType)
    collectibleType: CollectibleType;

    @ApiProperty()
    @IsUUID('4')
    itemId: string;
}
