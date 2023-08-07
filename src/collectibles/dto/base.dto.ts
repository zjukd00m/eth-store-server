import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class BaseCollectibleDTO {
    @ApiProperty()
    @IsEthereumAddress()
    address: string;
}
