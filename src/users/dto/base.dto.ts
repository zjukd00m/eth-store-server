import { Transform } from 'class-transformer';
import { IsEthereumAddress } from 'class-validator';

export class BaseUserDTO {
    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    wallet: string;
}
