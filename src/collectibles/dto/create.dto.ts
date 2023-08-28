import { IsEnum, IsEthereumAddress, IsOptional } from 'class-validator';
import { CollectibleType } from '../types/collectibles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { BaseCollectibleDTO } from './base.dto';

export class CreateCollectibleDTO extends BaseCollectibleDTO {
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

    @ApiProperty({
        required: false,
    })
    @IsEthereumAddress()
    @IsOptional()
    itemAddress?: string;
}
