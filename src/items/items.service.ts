import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { Repository } from 'typeorm';
import { CreateItemDTO } from './dto/create.dto';
import { DeleteItemDTO } from './dto/delete.dto';
import { FindItemByIdDTO } from './dto/findOne.dto';
import { FindAllItemsDTO } from './dto/findAll.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { User } from 'src/users/users.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

// TODO: Create an exception filter for the postgresql errors

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepository: Repository<Item>,
        private readonly httpService: HttpService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async create(request: CreateItemDTO) {
        const { wallet } = request;

        const { data: creator } = await firstValueFrom(
            this.httpService
                .get<User>(`http://localhost:8099/api/users/${wallet}`)
                .pipe(
                    catchError((error: AxiosError) => {
                        // An error that doesn't come from the server
                        if (error.response?.data) {
                            const message = (error.response.data as any)
                                .message;
                            const status = error.response.status;

                            throw new HttpException({ message }, status);
                        }

                        throw new HttpException(
                            { message: error.message },
                            HttpStatus.INTERNAL_SERVER_ERROR,
                        );
                    }),
                ),
        );

        const item = this.itemsRepository.create({
            ...request,
            creator,
        });

        this.eventEmitter.emit('notification.new', {
            data: request,
        });

        return await this.itemsRepository.save(item);
    }

    async delete(request: DeleteItemDTO) {
        const { address, inTrash } = request;

        const item = await this.findOneById({ address });

        if (item.inTrash && inTrash) {
            throw new HttpException(
                { message: 'The item was already deleted' },
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!item.inTrash && !inTrash) {
            throw new HttpException(
                { message: 'The item was already restored' },
                HttpStatus.BAD_REQUEST,
            );
        }

        item.inTrash = inTrash;

        return await this.itemsRepository.save(item);
    }

    async findOneById(request: FindItemByIdDTO) {
        const { address } = request;
        try {
            return await this.itemsRepository.findOneOrFail({
                where: { address },
            });
        } catch (error) {
            throw new HttpException(
                { message: "The item doesn't exist" },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findAll(request: FindAllItemsDTO) {
        const { creatorId, wallet } = request;

        if (creatorId?.length) {
            delete request.creatorId;
        }
        if (wallet?.length) {
            delete request.wallet;
        }

        const items = await this.itemsRepository.find({
            where: {
                ...request,
                ...(creatorId?.length && { creator: { id: creatorId } }),
                ...(wallet?.length && { creator: { wallet } }),
            },
        });

        return { items };
    }
}
