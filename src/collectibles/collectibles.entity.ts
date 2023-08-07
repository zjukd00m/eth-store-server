import { Item } from 'src/items/items.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from 'src/transactions/transactions.entity';
import { CollectibleType } from './types/collectibles.enum';

@Entity({ name: 'Collectibles' })
export class Collectible {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Smart contract address
    @Column('varchar', { nullable: false })
    address: string;

    // ERC721 OR ERC1155
    @Column('enum', { nullable: false, enum: CollectibleType })
    collectibleType: CollectibleType;

    @OneToOne(() => Item, (item) => item.collectible)
    @JoinColumn({ name: 'itemId' })
    item: Item;

    @OneToMany(() => Transaction, (transaction) => transaction.collectible)
    transactions: Transaction[];
}
