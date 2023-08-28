import { StoredCollectible } from 'src/stored-collectible/stored-collectible.entity';
import { User } from 'src/users/users.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'StoredCollections' })
export class StoredCollection {
    @PrimaryGeneratedColumn('uuid', {
        primaryKeyConstraintName: 'PK_StoredCollection',
    })
    id: string;

    @Column('varchar', { length: 255, nullable: false })
    name: string;

    @Column('varchar', { length: 50, nullable: false })
    symbol: string;

    @Column('bigint', { nullable: false })
    maxSupply: string;

    @Column('text', { nullable: false })
    picture: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('jsonb', { nullable: true })
    metadata?: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.storedCollections)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

    @OneToMany(
        () => StoredCollectible,
        (storedCollectible) => storedCollectible.collection,
    )
    storedCollectibles?: StoredCollectible[];
}
