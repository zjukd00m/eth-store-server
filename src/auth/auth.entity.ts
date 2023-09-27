import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'JWToken' })
export class JWToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 500 })
    token: string;

    @Column('bool', { default: false })
    revoked: boolean;
}
