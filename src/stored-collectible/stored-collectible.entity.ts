import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CollectibleStandardEnum } from './stored-collectible.enum';
import { User } from 'src/users/users.entity';
import { StoredCollection } from 'src/stored-collections/stored-collections.entity';
import { Collectible } from 'src/collectibles/collectibles.entity';

@Entity({ name: 'StoredCollectibles' })
export class StoredCollectible {
    @PrimaryGeneratedColumn('uuid', {
        primaryKeyConstraintName: 'PK_StoredCollectible',
    })
    id: string;

    @Column('varchar', { length: 255, nullable: false })
    name: string;

    @Column('varchar', { length: 255, nullable: false })
    description: string;

    @Column('text', { nullable: false })
    image: string;

    @Column('enum', {
        enum: CollectibleStandardEnum,
        default: CollectibleStandardEnum.ERC721,
        nullable: false,
    })
    standard: CollectibleStandardEnum;

    @Column('varchar', { length: 255, nullable: false, default: 'ffffff' })
    background_color: string;

    @Column('varchar', { length: 255, nullable: true })
    external_url?: string;

    @Column('varchar', { length: 255, nullable: true })
    youtube_url?: string;

    @Column('jsonb', { nullable: false })
    attributes: string;

    @ManyToOne(() => User, (user) => user.ownedCollectibles, {
        onDelete: 'CASCADE',
    })
    owner: User;

    @ManyToOne(
        () => StoredCollection,
        (storedCollection) => storedCollection.storedCollectibles,
        { onDelete: 'CASCADE' },
    )
    collection: StoredCollection;

    @OneToOne(
        () => Collectible,
        (collectible) => collectible.storedCollectible,
        { nullable: true },
    )
    @JoinColumn({ name: 'collectibleId', referencedColumnName: 'id' })
    collectible?: Collectible;
}
