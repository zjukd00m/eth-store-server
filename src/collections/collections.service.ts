import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FindOneCollectionDTO } from './dto/findOne.dto';
import { CreateCollectionDTO } from './dto/create.dto';
import { UpdateCollectionDTO } from './dto/update.dto';
import { FindAllCollectionsDTO } from './dto/findAll.dto';
import { Collection } from './collection.entity';
import { DeleteCollectionDTO } from './dto/delete.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class CollectionsService {
    constructor(
        @InjectRepository(Collection)
        private readonly collectionsRepository: Repository<Collection>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(request: CreateCollectionDTO) {
        const { address, wallet, contractType, contractData } = request;

        const walletExist = await this.usersRepository.exist({
            where: { wallet },
            select: { wallet: true },
        });

        if (!walletExist) {
            throw new HttpException(
                {
                    message:
                        'There is no an user account associated with that address',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        if (address) {
            const collectionExist = await this.collectionsRepository.exist({
                where: { address },
                select: { address: true },
            });

            if (collectionExist) {
                throw new HttpException(
                    {
                        message: `A collection with the address ${address} already exists`,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const collection: Collection = this.collectionsRepository.create({
            contractType,
            contractData,
            deployer: {
                wallet,
            },
            ...(address?.length && {
                address,
                isDeployed: true,
            }),
            ...(request.metadata && { metadata: request.metadata }),
        });

        return await this.collectionsRepository.save(collection);
    }

    // Only the owner of the collectible can update it
    async update(request: UpdateCollectionDTO) {
        const { address, isDeployed, id, wallet } = request;

        const walletExist = await this.usersRepository.exist({
            where: { wallet },
            select: { wallet: true },
        });

        if (!walletExist) {
            throw new HttpException(
                {
                    message:
                        'There is no an user account associated with that address',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        const collection = await this.findOneById({ id });

        if (collection.isDeployed && isDeployed) {
            throw new HttpException(
                {
                    message: 'The colletion was already deployed',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (
            (isDeployed && !address?.length) ||
            (address?.length && isDeployed === null) ||
            (address?.length && isDeployed === undefined)
        ) {
            throw new HttpException(
                {
                    message:
                        'A collection cannot have an address without the isDeployed attribute set as true',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (
            collection.address?.length &&
            address?.length &&
            collection.address !== address
        ) {
            throw new HttpException(
                {
                    message:
                        "The collection already has an address and can't be updated",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        for (const keyValue of Object.entries(request)) {
            const [key, value] = keyValue;

            if (value === null || value === undefined) {
                continue;
            }

            Object.assign(collection, { [key]: value });
        }

        return await this.collectionsRepository.save(collection);
    }

    async delete(request: DeleteCollectionDTO) {
        const { id } = request;

        const collection = await this.findOneById({ id });

        if (collection.isDeployed) {
            throw new HttpException(
                {
                    message: "A deployed collection can't be deleted",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        return await this.collectionsRepository.remove(collection);
    }

    async findOneById(request: FindOneCollectionDTO) {
        const { id } = request;

        try {
            const collection = await this.collectionsRepository.findOneOrFail({
                where: { id },
            });

            // TODO: Fetch the collectible smart contract data here...
            // if (collection.isDeployed) {}

            return collection;
        } catch (error) {
            throw new HttpException(
                { message: "The colletion doesn't exist" },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findAll(request: FindAllCollectionsDTO) {
        const { wallet } = request;

        if (wallet?.length) {
            delete request.wallet;
        }

        const collections = await this.collectionsRepository.find({
            where: {
                ...request,
                ...(wallet?.length && {
                    creator: { wallet: ILike(`%${wallet}%`) },
                }),
            },
        });

        // TODO: Fetch the collection smart contract data here...
        // await Promise.all(
        //     collections
        //         ?.filter(({ isDeployed }) => !isDeployed)
        //         ?.map((collection) => collection),
        // );

        return { collections };
    }
}
