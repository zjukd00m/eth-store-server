import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collectible } from './collectibles.entity';
import { Repository } from 'typeorm';
import { CreateCollectibleDTO } from './dto/create.dto';
import { UpdateCollectibleDTO } from './dto/update.dto';
import { FindAllCollectiblesDTO } from './dto/findAll.dto';
import { Collection } from 'src/collections/collection.entity';
import { AddToCollectionDTO } from './dto/add-to-collection.dto';
import { FindCollectibleById } from './dto/findById.dto';
import { ContractType } from 'src/common/enums/contract.enum';
import { RemoveFromCollectionDTO } from './dto/remove-from-collection.dto';
import { DeleteCollectibleDTO } from './dto/delete.dto';

@Injectable()
export class CollectiblesService {
    constructor(
        @InjectRepository(Collectible)
        private readonly collectibles: Repository<Collectible>,
        @InjectRepository(Collection)
        private readonly collections: Repository<Collection>,
    ) {}

    async create(request: CreateCollectibleDTO) {
        const { address, wallet, frozenMetadata, metadata } = request;

        if (address) {
            const exist = await this.collectibles.exist({
                where: { address },
                select: { address: true },
            });

            if (exist) {
                throw new HttpException(
                    {
                        message: `A collectible with the address ${address} already exist`,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (frozenMetadata && Object.values(metadata)?.length === 0) {
            throw new HttpException(
                {
                    message:
                        "The collectible's metadata can't be frozen if no metadata is provided",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const collectible = this.collectibles.create({
            ...request,
            deployer: {
                wallet,
            },
        });

        return await this.collectibles.save(collectible);
    }

    async edit(request: UpdateCollectibleDTO) {
        const { id, isDeployed, address, frozenMetadata, metadata } = request;

        const collectible = await this.findOneById({ id });

        if (
            (isDeployed && !address?.length) ||
            (address?.length && isDeployed === null) ||
            (address?.length && isDeployed === undefined)
        ) {
            throw new HttpException(
                {
                    message:
                        'A collectible cannot have an address without the isDeployed attribute set as true',
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (
            collectible.address?.length &&
            address?.length &&
            collectible.address !== address
        ) {
            throw new HttpException(
                {
                    message:
                        "The collection already has an address and can't be updated",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (frozenMetadata && Object.values(metadata)?.length === 0) {
            throw new HttpException(
                {
                    message:
                        "The collectible's metadata can't be frozen if no metadata is provided",
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        for (const keyValue of Object.entries(request)) {
            const [key, value] = keyValue;

            if (value === null || value === undefined) {
                continue;
            }

            Object.assign(collectible, { [key]: value });
        }

        return await this.collectibles.save(collectible);
    }

    async delete(request: DeleteCollectibleDTO) {
        const { id, wallet } = request;

        const collectible = await this.findOneById({ id });

        // Only the collectible's deployer can delete the item
        if (collectible.deployer.wallet !== wallet) {
            throw new UnauthorizedException();
        }

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

    async findOneById(request: FindCollectibleById) {
        const { id } = request;

        try {
            return await this.collectibles.findOneOrFail({
                where: {
                    id,
                },
                relations: ['collection', 'deployer'],
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

    async findAll(request: FindAllCollectiblesDTO) {
        const collectibles = await this.collectibles.find({
            where: {
                ...request,
            },
        });

        return { collectibles };
    }

    async addToCollection(request: AddToCollectionDTO) {
        const { collectibleId, collectionId } = request;

        const collectible = await this.findOneById({ id: collectibleId });

        const collection = await this.collections
            .findOneOrFail({
                where: {
                    id: collectionId,
                },
                select: {
                    id: true,
                    contractData: {
                        maxSupply: true,
                    },
                },
            })
            .catch(() => {
                throw new HttpException(
                    {
                        message: "The collection doesn't exist",
                    },
                    HttpStatus.NOT_FOUND,
                );
            });

        if (collection.contractType === ContractType.ERC721) {
            const collectionCount = await this.collectibles.countBy({
                collection: { id: collectionId },
            });

            if (
                BigInt(collectionCount) >
                BigInt(collection.contractData.maxSupply)
            ) {
                throw new HttpException(
                    {
                        message:
                            'The collection max supply limit has been reached',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        collectible.collection = {
            ...collectible?.collection,
            id: collectionId,
        };

        return await this.collectibles.save(collectible);
    }

    async removeFromCollection(request: RemoveFromCollectionDTO) {
        const { collectibleId, collectionId } = request;

        const collectible = await this.findOneById({ id: collectibleId });

        await this.collections
            .findOneOrFail({
                where: {
                    id: collectionId,
                },
                select: {
                    id: true,
                    contractData: {
                        maxSupply: true,
                    },
                },
            })
            .catch(() => {
                throw new HttpException(
                    {
                        message: "The collection doesn't exist",
                    },
                    HttpStatus.NOT_FOUND,
                );
            });

        collectible.collection = null;

        return await this.collectibles.save(collectible);
    }
}
