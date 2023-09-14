import { Test, TestingModule } from '@nestjs/testing';
import { CollectiblesService } from './collectibles.service';
import { Repository } from 'typeorm';
import { Collectible } from './collectibles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Collection } from 'src/collections/collection.entity';
import { getCollectiblesWithNoID } from './tests/collectibles.stub';
import { randomUUID } from 'crypto';
import { HttpException } from '@nestjs/common';

const collectionId = randomUUID();
const collectibleId = randomUUID();

// Address of the transaction when the item was transfered
const collectibleAddress =
    '0xa4948a3f473be033b72de37df3ec2ccd8dd04709964c217c94c534f1fb42ecb4';

const userWallet = '0x89ACF29bEED95eF65206118c6a44009fAb6D2776';

describe('CRUD the collectibles service', () => {
    let module: TestingModule;
    let service: CollectiblesService;
    let repository: Repository<Collectible>;
    let collectionRepo: Repository<Collection>;
    let collectible: Collectible;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                CollectiblesService,
                {
                    provide: getRepositoryToken(Collectible),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Collection),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<CollectiblesService>(CollectiblesService);

        repository = module.get<Repository<Collectible>>(
            getRepositoryToken(Collectible),
        );

        collectionRepo = module.get<Repository<Collection>>(
            getRepositoryToken(Collection),
        );

        const collectibles = getCollectiblesWithNoID(1, [collectionId]);
        collectible = collectibles[0];
    });

    it('Should verify the services are ok', () => {
        expect(module).toBeDefined();
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
        expect(collectionRepo).toBeDefined();
        expect(collectible).toBeDefined();
    });

    it('Should create a collectible that is not deployed with no ID', async () => {
        jest.spyOn(repository, 'create').mockReturnValue(collectible);
        jest.spyOn(repository, 'save').mockReturnValue(
            Promise.resolve({
                ...collectible,
                id: collectibleId,
            }),
        );

        const response = await service.create({
            ...collectible,
            wallet: userWallet,
        });

        expect(response).toBeDefined();

        expect(repository.create).toHaveBeenCalledWith({
            ...collectible,
            wallet: userWallet,
        });

        expect(repository.save).toHaveBeenCalled();

        collectible.id = collectibleId;
    });

    it('Should edit the number of items and add an address to an already stored collectible', async () => {
        const newSupply = 10;

        jest.spyOn(repository, 'findOneOrFail').mockReturnValue(
            Promise.resolve({
                ...collectible,
                id: collectibleId,
            }),
        );

        jest.spyOn(repository, 'save').mockReturnValue(
            Promise.resolve({
                ...collectible,
                supply: newSupply,
                id: collectibleId,
                address: collectibleAddress,
                isDeployed: true,
            }),
        );

        const response = await service.edit({
            ...collectible,
            supply: newSupply,
            id: collectibleId,
            address: collectibleAddress,
            isDeployed: true,
        });

        expect(response).toBeDefined();

        expect(response).toEqual({
            ...collectible,
            supply: newSupply,
            address: collectibleAddress,
            isDeployed: true,
            id: collectibleId,
        });

        expect(repository.findOneOrFail).toHaveBeenCalled();
        expect(repository.save).toHaveBeenCalled();
    });

    it('Should fail when trying to delete an already deployed collectible', async () => {
        jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(
            Promise.resolve({ ...collectible, isDeployed: true }),
        );

        jest.spyOn(repository, 'remove').mockReturnValue(
            Promise.resolve({
                ...collectible,
                id: null,
            }),
        );

        service.delete(collectibleId).catch((error) => {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(HttpException);
            expect(repository.findOneOrFail).toHaveBeenCalled();
            expect(repository.remove).toHaveBeenCalledTimes(0);
        });
    });

    // it('Should fail to add more collectibles to a collection that has reached its maxSupply', async () => {
    //     jest.spyOn(repository, 'findOneOrFail').mockReturnValue(
    //         Promise.resolve({
    //             ...collectible,
    //             id: collectibleId,
    //             isDeployed: true,
    //         }),
    //     );

    //     await service
    //         .addToCollection({
    //             collectionId,
    //             collectibleId,
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             expect(error).toBeDefined();
    //             expect(error).toBeInstanceOf(HttpException);
    //         });
    // });
});
