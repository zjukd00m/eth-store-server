import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class CollectionAddressDTO {
    @ApiProperty()
    @IsEthereumAddress()
    address: string;
}
