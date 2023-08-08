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

    // Smart contract address
    @Column('varchar', { length: 255 })
    address: string;

    @OneToOne(() => Collectible, (collectible) => collectible.item)
    collectible?: Collectible;

    @ManyToOne(() => User, (user) => user.items)
    @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
    creator: User;

    @Column('boolean', { nullable: false, default: false })
    inTrash: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
