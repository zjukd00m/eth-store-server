export interface CollectionMetadata {
    name: string;
    description: string;
    image: string;
    external_link: string;
}

export interface ContractData {
    name: string;
    symbol: string;
    baseURI: string;
    maxSupply?: string; // Only applicable for ERC-721 smart contracts
    preMintPrice?: string; // BigNumber price in WETH
    preMintStartDate?: Date; // UNIX timestamp in seconds
    preMintEndDate?: Date; // UNIX timestamp in seconds
    maxPreMintCollectibles?: string; // BigNumber
    maxPreMintCollectiblesPerWallet?: number;
    publicMintPrice: string; // BigNumber price in WETH
    publicMintStartDate: Date; // UNIX timestamp in seconds
    maxCollectiblesPerWallet?: number;
}

export interface ContractDataERC721 extends ContractData {}

export interface ContractDataERC1155 extends ContractData {}
