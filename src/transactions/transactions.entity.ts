import { Collection } from 'src/collections/collection.entity';
import { User } from 'src/users/users.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'Transactions' })
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Address of transaction in the blockchain
    @Column('varchar', { length: 256, nullable: false })
    address: string;

    @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'wallet' })
    user: User;

    @ManyToOne(() => Collection, (collection) => collection.transactions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'collectionId', referencedColumnName: 'id' })
    collection?: Collection;
}
