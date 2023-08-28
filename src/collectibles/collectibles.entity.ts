import { Item } from 'src/items/items.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from 'src/transactions/transactions.entity';
import { CollectibleType } from './types/collectibles.enum';
import { User } from 'src/users/users.entity';
import { StoredCollectible } from 'src/stored-collectible/stored-collectible.entity';

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

    @OneToOne(() => Item, (item) => item.collectible, { nullable: true })
    @JoinColumn({ name: 'itemId', referencedColumnName: 'id' })
    item?: Item;

    @ManyToOne(() => User, (user) => user.collectibles)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    creator: User;

    @OneToMany(() => Transaction, (transaction) => transaction.collectible)
    transactions: Transaction[];

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => StoredCollectible, { nullable: true })
    @JoinColumn({ name: 'storedCollectibleId', referencedColumnName: 'id' })
    storedCollectible?: StoredCollectible;
}
