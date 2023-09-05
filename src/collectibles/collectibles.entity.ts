import { Deployable } from 'src/common/entities/deployable.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Collection } from 'src/collections/collection.entity';
import { User } from 'src/users/users.entity';
import {
    CollectibleData,
    CollectibleMetadata,
} from './collectibles.interfaces';

@Entity({ name: 'Collectibles' })
export class Collectible extends Deployable {
    @PrimaryGeneratedColumn('uuid', {
        primaryKeyConstraintName: 'PK_Colletibles',
    })
    id: string;

    @Column('bool', { nullable: false, default: false })
    frozenMetadata: boolean;

    // OpenSea metadata that's shown in the UI
    @Column('jsonb', { array: false, nullable: true, default: null })
    metadata?: CollectibleMetadata;

    // Data stored in the EVM
    @Column('jsonb', { array: false, nullable: true, default: null })
    collectibleData?: CollectibleData;

    @Column('int', { nullable: false, default: 1 })
    supply: number;

    @ManyToOne(() => Collection, (collection) => collection.collectibles, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'collectionId', referencedColumnName: 'id' })
    collection: Collection;

    @ManyToOne(() => User, (user) => user.collectibles, { onDelete: 'CASCADE' })
    deployer: User;
}
