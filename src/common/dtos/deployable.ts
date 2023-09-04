import { IsBoolean, IsEnum, IsEthereumAddress } from 'class-validator';
import { IDeployable } from '../interfaces/deployable.interface';
import { ContractType } from '../enums/contract.enum';
import { Transform } from 'class-transformer';

export class DeployableDTO implements IDeployable {
    @Transform(({ value }) => value.toLowerCase())
    @IsEthereumAddress()
    address: string;

    @IsBoolean()
    isDeployed: boolean;

    @IsEnum(ContractType)
    contractType: ContractType;
}
