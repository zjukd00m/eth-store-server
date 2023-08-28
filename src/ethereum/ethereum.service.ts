import { Inject, Injectable } from '@nestjs/common';
import {
    COLLECTIBLES_ERC_1155_BYTECODE,
    COLLECTIBLES_ERC_1155_CONTRACT_ABI,
    COLLECTIBLES_ERC_721_BYTECODE,
    COLLECTIBLES_ERC_721_CONTRACT_ABI,
    ETHEREUM_PROVIDER,
} from './ethereum.constants';
import { ethers, Provider } from 'ethers';
import { ContractTypeEnum } from './ethereum.enums';
import { VerifySignatureInput } from './ethereum.interfaces';

@Injectable()
export class EthereumService {
    constructor(
        @Inject(ETHEREUM_PROVIDER)
        private readonly ethClient: Provider,
    ) {}

    async createFactoryContract(contractType: ContractTypeEnum) {
        switch (contractType) {
            case ContractTypeEnum.ERC_721:
                return this.createERC721FactoryContract();
            case ContractTypeEnum.ERC_1155:
                return this.createERC1155FactoryContract();
            default: {
                throw new Error('Unsupported contract type');
            }
        }
    }

    async verifyMessageSignature(request: VerifySignatureInput) {
        const { message, signature, wallet } = request;

        const recoveredWallet = ethers.verifyMessage(message, signature);

        if (recoveredWallet.toLowerCase() === wallet.toString().toLowerCase()) {
            return true;
        }

        return false;
    }

    async createERC721FactoryContract() {
        const contractFactory = new ethers.ContractFactory(
            COLLECTIBLES_ERC_721_CONTRACT_ABI,
            COLLECTIBLES_ERC_721_BYTECODE,
        );

        const contract = await contractFactory.deploy();

        return contract;
    }

    async createERC1155FactoryContract() {
        const contractFactory = new ethers.ContractFactory(
            COLLECTIBLES_ERC_1155_CONTRACT_ABI,
            COLLECTIBLES_ERC_1155_BYTECODE,
        );

        const contract = await contractFactory.deploy();

        return contract;
    }
}
