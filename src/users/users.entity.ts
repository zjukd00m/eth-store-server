import { Item } from 'src/items/items.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { Transaction } from 'src/transactions/transactions.entity';
import { Collectible } from 'src/collectibles/collectibles.entity';
import { StoredCollection } from 'src/stored-collections/stored-collections.entity';
import { StoredCollectible } from 'src/stored-collectible/stored-collectible.entity';

@Entity({ name: 'Users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false })
    wallet: string;

    @Column('varchar', { nullable: true, default: null })
    email?: string;

    @Column('boolean', { nullable: false, default: false })
    notifications: boolean;

    @Column('text', { nullable: true, default: null })
    profilePicture?: string;

    @Column('text', { nullable: true, default: null })
    backgroundPicture?: string;

    @Column('boolean', { nullable: false, default: false })
    confirmed: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @OneToMany(() => Item, (item) => item.creator)
    items?: Item[];

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions?: Transaction[];

    @OneToMany(() => Collectible, (collectible) => collectible.creator)
    collectibles?: Collectible[];

    @OneToMany(
        () => StoredCollection,
        (storedCollection) => storedCollection.user,
    )
    storedCollections?: StoredCollection[];

    @OneToMany(
        () => StoredCollectible,
        (storedCollectible) => storedCollectible.owner,
    )
    ownedCollectibles?: StoredCollectible[];
}
