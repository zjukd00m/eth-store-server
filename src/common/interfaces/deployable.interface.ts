import { ContractType } from '../enums/contract.enum';

export interface IDeployable {
    address: string;
    isStored?: boolean;
    contractType: ContractType;
}
