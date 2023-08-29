import { Test, TestingModule } from '@nestjs/testing';
import { StoredCollectionsService } from './stored-collection.service';
import { StoredCollection } from './stored-collections.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('Initialize and setup the StoredCollection test module', () => {
    let module: TestingModule;
    let service: StoredCollectionsService;
    let repo: Repository<StoredCollection>;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                StoredCollectionsService,
                {
                    provide: getRepositoryToken(StoredCollection),
                    useClass: Repository<StoredCollection>,
                },
            ],
        }).compile();

        service = module.get<StoredCollectionsService>(
            StoredCollectionsService,
        );

        repo = module.get<Repository<StoredCollection>>(
            getRepositoryToken(StoredCollection),
        );
    });

    describe('Test the StoredCollection module', () => {
        it('Verifies the test module is ready', async () => {
            expect(module).toBeDefined();
            expect(service).toBeDefined();
            expect(repo).toBeDefined();
        });
    });
});
