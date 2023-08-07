import { Collectible } from 'src/collectibles/collectibles.entity';
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
    @Column('varchar', { nullable: false })
    address: string;

    // Value of the transaction in WEI
    @Column('int', { nullable: false })
    value: number;

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Collectible, (collectible) => collectible.transactions)
    @JoinColumn({ name: 'collectibleId' })
    collectible: Collectible;
}
