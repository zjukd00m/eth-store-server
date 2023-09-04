import { Column, CreateDateColumn } from 'typeorm';
import { IDeployable } from '../interfaces/deployable.interface';
import { ContractType } from '../enums/contract.enum';

export class Deployable implements IDeployable {
    @Column('varchar', { length: 255, nullable: true, default: null })
    address?: string;

    @Column('bool', { nullable: false, default: false })
    isDeployed: boolean;

    @Column('enum', {
        enum: ContractType,
        default: ContractType.ERC721,
        nullable: false,
    })
    contractType: ContractType;

    @CreateDateColumn()
    deployedAt: Date;
}
