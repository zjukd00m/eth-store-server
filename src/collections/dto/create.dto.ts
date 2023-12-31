import {
    IsEnum,
    IsEthereumAddress,
    IsNotEmptyObject,
    IsObject,
    IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CollectionAddressDTO } from './collection-address.dto';
import { ContractType } from 'src/common/enums/contract.enum';
import { CreateCollectionMetadataDTO } from './create-colletion-metadata.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { CreateCollectionDataDTO } from './create-collection-data.dto';

export class CreateCollectionDTO extends PartialType(CollectionAddressDTO) {
    @ApiProperty()
    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    wallet: string;

    @ApiProperty({
        enum: ContractType,
        default: ContractType.ERC721,
        description: 'The contract type of the collectible (ERC721 or ERC1155)',
    })
    @IsEnum(ContractType)
    contractType: ContractType;

    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    metadata?: CreateCollectionMetadataDTO;

    @IsObject()
    @IsNotEmptyObject()
    contractData: CreateCollectionDataDTO;
}
