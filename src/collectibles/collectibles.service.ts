import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collectible } from './collectibles.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from 'src/users/users.entity';
import { AxiosError } from 'axios';
import { FindOneCollectibleDTO } from './dto/findOne.dto';
import { FindAllColletiblesDTO } from './dto/findAll.dto';
import { CreateCollectibleDTO } from './dto/create.dto';

@Injectable()
export class CollectiblesService {
    constructor(
        @InjectRepository(Collectible)
        private collectiblesRepository: Repository<Collectible>,
        private httpService: HttpService,
    ) {}

    async create(request: CreateCollectibleDTO) {
        const { wallet, itemId } = request;

        const { data: creator } = await firstValueFrom(
            this.httpService
                .get<User>(`http://localhost:8099/api/users/${wallet}`)
                .pipe(
                    catchError((error: AxiosError) => {
                        if (!error.request?.data) {
                            throw new HttpException(
                                { message: error.message },
                                HttpStatus.INTERNAL_SERVER_ERROR,
                            );
                        }

                        const message = (error.response.data as any).message;
                        const status = error.response.status;

                        throw new HttpException({ message }, status);
                    }),
                ),
        );

        // Create the collectible smart contract

        // Deploy the collectible smart contract

        delete request.itemId;
        delete request.wallet;

        const collectible = this.collectiblesRepository.create({
            ...request,
            item: {
                id: itemId,
            },
        });

        return await this.collectiblesRepository.save(collectible);
    }

    async findOneById(request: FindOneCollectibleDTO) {
        const { address } = request;

        try {
            const collectible = await this.collectiblesRepository.findOneOrFail(
                {
                    where: { address },
                },
            );

            // TODO: Fetch the collectible smart contract data here...

            return collectible;
        } catch (error) {
            throw new HttpException(
                { message: 'Collectible not found' },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findAll(request: FindAllColletiblesDTO) {
        const { wallet } = request;

        if (wallet?.length) {
            delete request.wallet;
        }

        const collectibles = await this.collectiblesRepository.find({
            where: {
                ...request,
                ...(wallet?.length && { item: { creator: { wallet } } }),
            },
        });

        // TODO: Fetch the collectible smart contract data here...
        // await Promise.all(collectibles?.map((collectible) => {}))

        return { collectibles };
    }
}
