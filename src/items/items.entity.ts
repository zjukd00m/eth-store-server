import { User } from 'src/users/users.entity';
import { Collectible } from '../collectibles/collectibles.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'Items' })
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false })
    name: string;

    @Column('varchar', { nullable: false })
    description: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @Column('boolean', { nullable: false, default: false })
    isOnSale: boolean;

    @Column('integer', { nullable: false, default: 1 })
    quantity: number;

    @Column('integer', { nullable: false })
    price: number;

    @OneToOne(() => Collectible, (collectible) => collectible.itemId)
    collectible: Collectible;

    @OneToMany(() => User, (user) => user.items)
    creator: User;
}
