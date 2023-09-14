import { ContractType } from 'src/common/enums/contract.enum';
import { Collection } from '../collection.entity';
import { ContractDataERC721 } from '../collections.interface';
import { User } from 'src/users/users.entity';

const deployer = new User();
deployer.wallet = '0x89ACF29bEED95eF65206118c6a44009fAb6D2776';

export function getCollectionsWithNoID(amount: number): Collection[] {
    const collections: Collection[] = [...Array(amount)].map((_) => {
        // Non deployed contract
        const publicMintStartDate = new Date();

        publicMintStartDate.setDate(publicMintStartDate.getDate() + 10);

        const contractData: ContractDataERC721 = {
            name: 'The Useless NFT',
            symbol: 'TUNFT',
            baseURI: 'https://www.google.com/search?q=',
            maxSupply: '1000',
            preMintPrice: null,
            preMintStartDate: null,
            preMintEndDate: null,
            maxPreMintCollectibles: null,
            maxPreMintCollectiblesPerWallet: null,
            publicMintPrice: '50000000000000000',
            publicMintStartDate,
            maxCollectiblesPerWallet: null,
        };
        return {
            id: null,
            metadata: null,
            contractData,
            address: null,
            collectibles: null,
            transactions: null,
            isDeployed: false,
            contractType: ContractType.ERC721,
            deployedAt: new Date(),
            deployer,
        };
    });
    return collections;
}
