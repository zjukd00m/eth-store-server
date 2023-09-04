import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collectible } from './collectibles.entity';
import { Repository } from 'typeorm';
import { CreateCollectibleDTO } from './dto/create.dto';
import { UpdateCollectibleDTO } from './dto/update.dto';
import { FindAllCollectiblesDTO } from './dto/findAll.dto';

@Injectable()
export class CollectiblesService {
    constructor(
        @InjectRepository(Collectible)
        private readonly collectibles: Repository<Collectible>,
    ) {}

    async create(request: CreateCollectibleDTO) {
        // const { id, name } = request;
        // const exist = await this.collectibles.exist({
        //     where: {
        //         name,
        //     },
        // });
        // if (exist)
        //     throw new HttpException(
        //         {
        //             message:
        //                 "There's an existing data record with the same dat",
        //         },
        //         HttpStatus.BAD_REQUEST,
        //     );
        // const collectible = this.collectibles.create(request);
        // return await this.collectibles.save(collectible);
    }

    async edit(request: UpdateCollectibleDTO) {
        const { id, isDeployed } = request;

        const collectible = await this.findOneById(id);
    }

    async delete(id: string) {
        const collectible = await this.findOneById(id);

        if (collectible.isDeployed) {
            throw new HttpException(
                {
                    message: "A deployed collectible can't be deleted",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.collectibles.remove(collectible);
    }

    findOneById(id: string) {
        try {
            return this.collectibles.findOneOrFail({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new HttpException(
                {
                    message: 'The collectible was not found',
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    findAll(request: FindAllCollectiblesDTO) {
        return this.collectibles.find({
            where: {
                ...request,
            },
        });
    }
}
