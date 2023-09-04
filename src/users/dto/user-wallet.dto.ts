import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEthereumAddress } from 'class-validator';

export class UserWalletDTO {
    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    @ApiProperty()
    wallet: string;
}
