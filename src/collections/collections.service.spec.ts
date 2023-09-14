import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsService } from './collections.service';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

describe('CRUD collections', () => {
    let service: CollectionsService;
    let module: TestingModule;
    let repository: Repository<Collection>;
    let userRepo: Repository<User>;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                CollectionsService,
                {
                    provide: getRepositoryToken(Collection),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<CollectionsService>(CollectionsService);

        repository = module.get<Repository<Collection>>(
            getRepositoryToken(Collection),
        );

        userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('Should verify the services are ok', () => {
        expect(module).toBeDefined();
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
        expect(userRepo).toBeDefined();
    });
});
