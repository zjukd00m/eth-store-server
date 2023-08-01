import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Repository } from 'typeorm';
import { Item } from './items.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Item', () => {
    let service: ItemsService;
    let repo: Repository<Item>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ItemsService,
                {
                    provide: getRepositoryToken(Item),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<ItemsService>(ItemsService);

        repo = module.get<Repository<Item>>(getRepositoryToken(Item));
    });

    describe('CRUD', () => {
        it('Should have the service defined', () => {
            expect(service).toBeDefined();
        });
    });
});
