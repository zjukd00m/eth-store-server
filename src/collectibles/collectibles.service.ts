import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collectible } from './collectibles.entity';
import { ILike, In, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from 'src/users/users.entity';
import { AxiosError } from 'axios';
import { FindOneCollectibleDTO } from './dto/findOne.dto';
import { FindAllColletiblesDTO } from './dto/findAll.dto';
import { CreateCollectibleDTO } from './dto/create.dto';
import { UpdateCollectibleDTO } from './dto/update.dto';
import { Item } from 'src/items/items.entity';

@Injectable()
export class CollectiblesService {
    constructor(
        @InjectRepository(Collectible)
        private collectiblesRepository: Repository<Collectible>,
        private httpService: HttpService,
    ) {}

    async create(request: CreateCollectibleDTO) {
        const { wallet, address, collectibleType, itemAddress } = request;

        const { data: creator } = await firstValueFrom(
            this.httpService
                .get<User>(`http://localhost:8099/api/users/${wallet}`)
                .pipe(
                    catchError((error: AxiosError) => {
                        if (!error.response?.data) {
                            const message = (error.response.data as any)
                                .message;

                            throw new HttpException(
                                { message },
                                error.response.status,
                            );
                        }

                        throw new HttpException(
                            { message: error.message },
                            HttpStatus.INTERNAL_SERVER_ERROR,
                        );
                    }),
                ),
        );

        let itemId = null;

        if (itemAddress?.length) {
            const { data: item } = await firstValueFrom(
                this.httpService
                    .get<Item>(`http://localhost:8099/api/items/${itemAddress}`)
                    .pipe(
                        catchError((error: AxiosError) => {
                            if (error.response?.data) {
                                const message = (error.response.data as any)
                                    .message;
                                const status = error.response.status;

                                throw new HttpException({ message }, status);
                            }

                            throw new HttpException(
                                { message: error.message },
                                HttpStatus.INTERNAL_SERVER_ERROR,
                            );
                        }),
                    ),
            );

            itemId = item.id;
        }

        const collectible = this.collectiblesRepository.create({
            address,
            collectibleType,
            creator: {
                id: creator.id,
            },
            ...(itemAddress?.length && { item: { id: itemId } }),
        });

        return await this.collectiblesRepository.save(collectible);
    }

    // Only the owner of the collectible can update it
    async update(request: UpdateCollectibleDTO) {
        const { wallet, address } = request;

        const { data: creator } = await firstValueFrom(
            this.httpService
                .get<User>(`http://localhost:8099/api/users/${wallet}`)
                .pipe(
                    catchError((error: AxiosError) => {
                        if (error.response?.data) {
                            const message = (error.response.data as any)
                                .message;
                            const status = error.response.status;
                            throw new HttpException({ message }, status);
                        }

                        throw new HttpException(
                            { message: error.message },
                            HttpStatus.INTERNAL_SERVER_ERROR,
                        );
                    }),
                ),
        );

        const collectible = await this.findOneById({ address });

        // TODO: Verify the current onwner of the collectible is the same as the user that sent the request
        // if (collectible.creator.wallet !== creatorWallet) {
        // throw new HttpException(
        //     { message: 'Not authorized' },
        //     HttpStatus.UNAUTHORIZED,
        // );
        // ?

        // Update the owner of the collectible
        if (collectible.creator.wallet !== wallet) {
            collectible.creator.wallet = creator.wallet;
        }

        return await this.collectiblesRepository.save(collectible);
    }

    async findOneById(request: FindOneCollectibleDTO) {
        const { address } = request;

        try {
            const collectible = await this.collectiblesRepository.findOneOrFail(
                {
                    where: { address },
                    relations: ['creator'],
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
                ...(wallet?.length && {
                    creator: { wallet: ILike(`%${wallet}%`) },
                }),
            },
            relations: ['creator'],
        });

        // TODO: Fetch the collectible smart contract data here...
        // await Promise.all(collectibles?.map((collectible) => {}))

        return { collectibles };
    }
}
