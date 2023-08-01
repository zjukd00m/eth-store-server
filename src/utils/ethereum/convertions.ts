import { AlchemyProvider, ethers } from 'ethers';

interface AlchemyProviderConfig {
    network: ethers.Networkish;
    apiKey: string;
}

const alchemyProviderConfig: AlchemyProviderConfig = {
    network: {
        name: 'goerli',
        chainId: 0,
        ensAddress: '',
        ensNetwork: 0,
    },
    apiKey: process.env.ALCHEMY_API_KEY,
};

// const ethProvider = new ethers.AlchemyProvider({ ...alchemyProviderConfig });

// export async function getTransactionByHash(
// hash: string,
// ): Promise<ethers.TransactionResponse> {
// const tx = await ethProvider.getTransaction(hash);
// return tx;
// }

export async function waitForTransactions() {}

export async function createStoreWallet() {
    // const Contract = new ethers.ContractFactory();
    // const contract = await Contract.deploy();
    // await contract.waitForDeployment();
    // return contract;
}

export function isValidEthereumWallet(address: string) {
    return ethers.isAddress(address);
}
