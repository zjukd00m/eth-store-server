// Create a testing module
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { HttpException, HttpStatus } from '@nestjs/common';

const userWallet = '0x89ACF29bEED95eF65206118c6a44009fAb6D2776';
const txAddress =
    '0xa4948a3f473be033b72de37df3ec2ccd8dd04709964c217c94c534f1fb42ecb4';

describe('TransactionsService', () => {
    let module: TestingModule;
    let service: TransactionsService;
    let repository: Repository<Transaction>;
    let tx: Transaction;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                TransactionsService,
                {
                    provide: getRepositoryToken(Transaction),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
        repository = module.get<Repository<Transaction>>(
            getRepositoryToken(Transaction),
        );
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    it('Should register a transaction', async () => {
        const transactionId = randomUUID();

        jest.spyOn(repository, 'exist').mockReturnValue(Promise.resolve(false));
        jest.spyOn(repository, 'create').mockReturnValue({
            ...tx,
            user: null,
            collection: null,
        });
        jest.spyOn(repository, 'save').mockReturnValue(
            Promise.resolve({
                ...tx,
                id: transactionId,
            }),
        );

        tx = await service.create({
            address: txAddress,
            wallet: userWallet,
        });

        expect(tx).toBeDefined();
        expect(tx.id).toEqual(transactionId);

        expect(repository.exist).toHaveBeenCalled();
        expect(repository.create).toHaveBeenCalled();
        expect(repository.save).toHaveBeenCalled();
    });

    it("Shouldn't register a transaction if it already exists", async () => {
        jest.spyOn(repository, 'exist').mockReturnValue(Promise.resolve(true));

        let response: Transaction;

        try {
            response = await service.create({
                address: txAddress,
                wallet: userWallet,
            });
        } catch (error) {
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
            expect(error.message).toEqual(
                `A transaction with the address ${txAddress} was already registered`,
            );
        }

        expect(response).toBeUndefined();

        expect(repository.exist).toHaveBeenCalled();
        expect(repository.save).toHaveBeenCalled();
    });

    it('Should find a transaction by ID', async () => {
        jest.spyOn(repository, 'findOneByOrFail').mockReturnValue(
            Promise.resolve(tx),
        );

        const transaction = await service.findOneById({
            id: tx.id,
        });

        expect(transaction).toBeDefined();
        expect(transaction.id).toEqual(tx.id);

        expect(repository.findOneByOrFail).toHaveBeenCalled();
    });

    it('Should find all transactions', async () => {
        jest.spyOn(repository, 'find').mockReturnValue(Promise.resolve([tx]));

        const response = await service.findAll({});

        expect(response).toBeDefined();
        expect(response).toHaveProperty('transactions');
        expect(response.transactions.length).toEqual(1);

        expect(repository.find).toHaveBeenCalled();
    });

    it("Shouldn't find any transaction when the filters sends non existing ids", async () => {
        jest.spyOn(repository, 'find').mockReturnValue(Promise.resolve([]));

        const txId = randomUUID();

        await expect(service.findAll({ id: txId })).resolves.toEqual({
            transactions: [],
        });

        expect(repository.find).toHaveBeenCalledWith({
            where: {
                id: txId,
            },
        });
    });
});
