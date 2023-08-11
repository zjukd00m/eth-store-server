import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

export class BaseItemDTO {
    @ApiProperty()
    @IsEthereumAddress()
    address: string;
}
