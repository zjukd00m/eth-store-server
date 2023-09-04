import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create.dto';
import { FindAllTransactionsDTO } from './dto/findAll.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create(request: CreateTransactionDTO) {
        return this.transactionsService.create(request);
    }

    @Get(':id')
    findOneById(@Param('id', ParseUUIDPipe) id: string) {
        return this.transactionsService.findOneById({ id });
    }

    @Get()
    findAll(@Query() request: FindAllTransactionsDTO) {
        return this.transactionsService.findAll(request);
    }
}
