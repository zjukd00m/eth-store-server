import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
    @IsEthereumAddress()
    wallet: string;

    @IsString()
    @IsNotEmpty()
    signature: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
