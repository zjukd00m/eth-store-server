import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoredCollectible } from './stored-collectible.entity';
import { StoredCollectiblesService } from './stored-collectible.service';

describe('Initialize and setup the StoredCollectible test module', () => {
    let module: TestingModule;
    let service: StoredCollectiblesService;
    let repo: Repository<StoredCollectible>;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                StoredCollectiblesService,
                {
                    provide: getRepositoryToken(StoredCollectible),
                    useClass: Repository<StoredCollectible>,
                },
            ],
        }).compile();

        service = module.get<StoredCollectiblesService>(
            StoredCollectiblesService,
        );

        repo = module.get<Repository<StoredCollectible>>(
            getRepositoryToken(StoredCollectible),
        );
    });

    describe('Test the StoredCollectibles module', () => {
        it('Verifies the test module is ready', () => {
            expect(module).toBeDefined();
            expect(service).toBeDefined();
            expect(repo).toBeDefined();
        });
    });
});
