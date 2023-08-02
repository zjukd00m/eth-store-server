import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { ILike, Repository } from 'typeorm';
import { CreateItemDTO } from './dto/create.dto';
import { UpdateItemDTO } from './dto/update.dto';
import { DeleteItemDTO } from './dto/delete.dto';
import { FindItemByIdDTO } from './dto/findOne.dto';
import { FindAllItemsDTO } from './dto/findAll.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { User } from 'src/users/users.entity';

// TODO: Create an exception filter for the postgresql errors

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepository: Repository<Item>,
        private readonly httpService: HttpService,
    ) {}

    async create(request: CreateItemDTO) {
        const { wallet } = request;

        const { data: creator } = await firstValueFrom(
            this.httpService
                .get<User>(`http://localhost:8099/api/users/${wallet}`)
                .pipe(
                    catchError((error: AxiosError) => {
                        // An error that doesn't come from the server
                        if (!error.response?.data) {
                            throw new HttpException(
                                { message: error.message },
                                HttpStatus.INTERNAL_SERVER_ERROR,
                            );
                        }

                        const message = (error.response.data as any).message;
                        const status = error.response.status;

                        throw new HttpException({ message }, status);
                    }),
                ),
        );

        const item = this.itemsRepository.create({
            ...request,
            creator,
        });

        return await this.itemsRepository.save(item);
    }

    async update(request: UpdateItemDTO) {
        const { id } = request;

        const item = await this.findOneById({ id });

        Object.assign(item, request);

        return await this.itemsRepository.save(item);
    }

    async delete(request: DeleteItemDTO) {
        const { id } = request;

        const item = await this.findOneById({ id });

        return await this.itemsRepository.remove(item);
    }

    async findOneById(request: FindItemByIdDTO) {
        const { id } = request;
        try {
            return await this.itemsRepository.findOneOrFail({
                where: { id },
            });
        } catch (error) {
            throw new HttpException(
                { message: "The item doesn't exist" },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findAll(request: FindAllItemsDTO) {
        const { creatorId, name } = request;

        if (creatorId?.length) {
            delete request.creatorId;
        }

        const items = await this.itemsRepository.find({
            where: {
                ...request,
                ...(creatorId?.length && { creator: { id: creatorId } }),
                ...(name?.length && { name: ILike(`%${name}%`) }),
            },
        });

        return { items };
    }
}
