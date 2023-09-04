import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction } from './transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDTO } from './dto/create.dto';
import { FindOneTransactionById } from './dto/findOneById.dto';
import { FindAllTransactionsDTO } from './dto/findAll.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
    ) {}

    async create(request: CreateTransactionDTO) {
        const { address } = request;

        const exist = await this.transactionsRepository.exist({
            where: {
                address,
            },
            select: {
                address: true,
            },
        });

        if (exist) {
            throw new HttpException(
                {
                    message: `A transaction with the address ${address} was already registered`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        const transaction = this.transactionsRepository.create(request);

        return await this.transactionsRepository.save(transaction);
    }

    async findOneById(request: FindOneTransactionById) {
        const { id } = request;

        try {
            const transaction =
                await this.transactionsRepository.findOneByOrFail({ id });

            // TODO: Fetch the transaction data from the EVM

            return transaction;
        } catch (error) {
            throw new HttpException(
                {
                    message: "The transaction doesn't exist",
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findAll(request: FindAllTransactionsDTO) {
        const transactions = await this.transactionsRepository.find({
            where: request,
        });

        return { transactions };
    }
}
