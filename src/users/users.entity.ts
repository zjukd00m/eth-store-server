import {
    Entity,
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Transaction } from 'src/transactions/transactions.entity';
import { Collection } from 'src/collections/collection.entity';
import { Collectible } from 'src/collectibles/collectibles.entity';

@Entity({ name: 'Users' })
export class User {
    @PrimaryColumn({
        type: 'text',
        unique: true,
        nullable: false,
        primaryKeyConstraintName: 'PK_UserWallet',
        foreignKeyConstraintName: 'FK_UserWallet',
        transformer: {
            from: (value) => value,
            to: (value) => value.toLowerCase(),
        },
    })
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

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions?: Transaction[];

    @OneToMany(() => Collection, (collection) => collection.deployer)
    collections?: Collection[];

    @OneToMany(() => Collectible, (collectible) => collectible.deployer)
    collectibles?: Collectible[];
}
