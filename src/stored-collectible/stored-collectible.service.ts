import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteStoredCollectibleDTO } from './dto/delete.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoredCollectible } from './stored-collectible.entity';
import { Repository } from 'typeorm';
import { FindAllStoredCollectiblesDTO } from './dto/findAll.dto';
import { FindOneStoredColletibleByIdDTO } from './dto/findOne.dto';
import { UpdateStoredCollectibleDTO } from './dto/update.dto';
import { CreateStoredCollectibleDTO } from './dto/create.dto';

@Injectable()
export class StoredCollectiblesService {
    constructor(
        @InjectRepository(StoredCollectible)
        private readonly storedCollectiblesService: Repository<StoredCollectible>,
    ) {}

    async create(request: CreateStoredCollectibleDTO) {
        const { name } = request;

        const exist = await this.storedCollectiblesService.findOne({
            where: { name },
        });

        if (exist)
            throw new HttpException(
                'A stored collectible already exist with that name',
                HttpStatus.BAD_REQUEST,
            );

        return await this.storedCollectiblesService.save(request);
    }

    async update(request: UpdateStoredCollectibleDTO) {
        const { id } = request;

        const storedCollectible = await this.findOneById({ id });

        Object.assign(storedCollectible, request);

        return await this.storedCollectiblesService.save(request);
    }

    async delete(request: DeleteStoredCollectibleDTO) {
        const storedCollectible = await this.findOneById(request);

        return await this.storedCollectiblesService.remove(storedCollectible);
    }

    async findAll(request: FindAllStoredCollectiblesDTO) {
        return await this.storedCollectiblesService.find({
            where: {
                ...request,
            },
        });
    }

    async findOneById(request: FindOneStoredColletibleByIdDTO) {
        const { id } = request;

        try {
            return await this.storedCollectiblesService.findOneByOrFail({ id });
        } catch (error) {
            throw new HttpException(
                "The stored collectible doesn't exist",
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
