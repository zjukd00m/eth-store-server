import { Deployable } from 'src/common/entities/deployable.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from 'src/collections/collection.entity';

@Entity({ name: 'Collectibles' })
export class Collectible extends Deployable {
    @PrimaryGeneratedColumn('uuid', {
        primaryKeyConstraintName: 'PK_Colletibles',
    })
    id: string;

    @ManyToOne(() => Collection, (collection) => collection.collectibles)
    collection: Collection;
}
