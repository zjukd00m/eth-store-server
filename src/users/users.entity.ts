import { Item } from 'src/items/items.entity';
import { Collectible } from '../collectibles/collectibles.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';

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

    @OneToMany(() => Collectible, (collectible) => collectible.creator)
    @JoinColumn({ name: 'UserCollectibles' })
    collectibles?: Collectible[];

    @OneToMany(() => Item, (item) => item.creator)
    @JoinColumn({ name: 'UserItems' })
    items?: Item[];
}
