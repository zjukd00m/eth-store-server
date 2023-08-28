import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoredCollection } from './stored-collections.entity';
import { Repository } from 'typeorm';
import { FindOneStoredCollectionById } from './dto/findOneById.dto';
import { CreateStoredCollectionDTO } from './dto/create.dto';
import UpdateStoredCollectionDTO from './dto/update.dto';
import { FindAllStoredCollectionsDTO } from './dto/findAll.dto';
import { DeleteStoredCollectionDTO } from './dto/delete.dto';

@Injectable()
export class StoredCollectionsService {
    constructor(
        @InjectRepository(StoredCollection)
        private readonly storedCollectionsService: Repository<StoredCollection>,
    ) {}

    async create(request: CreateStoredCollectionDTO) {
        const { name, symbol } = request;

        const exist = await this.storedCollectionsService.exist({
            where: { name, symbol },
        });

        if (exist)
            throw new HttpException(
                'A stored collection already exist with that name',
                HttpStatus.BAD_REQUEST,
            );

        const storedCollection = this.storedCollectionsService.create(request);

        return await this.storedCollectionsService.save(storedCollection);
    }

    async update(request: UpdateStoredCollectionDTO) {
        const { id } = request;

        const storedCollection = await this.findOneById({ id });

        Object.assign(storedCollection, request);

        return await this.storedCollectionsService.save(storedCollection);
    }

    async delete(request: DeleteStoredCollectionDTO) {
        const { id } = request;

        const storedCollection = await this.findOneById({ id });

        return await this.storedCollectionsService.remove(storedCollection);
    }

    async findAll(request: FindAllStoredCollectionsDTO) {
        return await this.storedCollectionsService.find({
            where: {
                ...request,
            },
        });
    }

    async findOneById(request: FindOneStoredCollectionById) {
        const { id } = request;
        try {
            return await this.storedCollectionsService.findOneByOrFail({
                id,
            });
        } catch (error) {
            throw new HttpException(
                "The stored contract doesn't exist",
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
