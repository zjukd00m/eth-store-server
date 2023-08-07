import { Collectible } from 'src/collectibles/collectibles.entity';
import { User } from 'src/users/users.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
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

    @Column('integer', { nullable: false, default: 1 })
    quantity: number;

    @Column('integer', { nullable: false })
    price: number;

    @OneToOne(() => Collectible, (collectible) => collectible.item)
    collectible: Collectible;

    @ManyToOne(() => User, (user) => user.items)
    @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
    creator: User;
}
