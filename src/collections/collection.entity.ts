import { Collectible } from 'src/collectibles/collectibles.entity';
import { Deployable } from 'src/common/entities/deployable.entity';
import { User } from 'src/users/users.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {
    CollectionMetadata,
    ContractDataERC1155,
    ContractDataERC721,
} from './collections.interface';
import { Transaction } from 'src/transactions/transactions.entity';

@Entity({ name: 'Collections' })
export class Collection extends Deployable {
    @PrimaryGeneratedColumn('uuid', {
        primaryKeyConstraintName: 'PK_Collections',
    })
    id: string;

    // OpenSea contract level metadata (stored in the smart contract as an URL string pointing to a json file)
    @Column('jsonb', { array: false, nullable: true, default: null })
    metadata: CollectionMetadata;

    // The contract data is the same for ERC-721 and ERC-1155 NFT standards (this data is stored in the EVM)
    @Column('jsonb', { array: false, nullable: false })
    contractData: ContractDataERC721 | ContractDataERC1155;

    @ManyToOne(() => User, (user) => user.collections)
    @JoinColumn({ name: 'deployerWallet', referencedColumnName: 'wallet' })
    deployer: User;

    @OneToMany(() => Collectible, (collectible) => collectible.collection)
    collectibles?: Collectible[];

    @OneToMany(() => Transaction, (transaction) => transaction.collection)
    transactions?: Transaction[];
}
