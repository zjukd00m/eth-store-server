import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create.dto';
import { UpdateUserDTO } from './dto/update.dto';
import { DeleteUserDTO } from './dto/delete.dto';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeProfilePicturesDTO } from './dto/changeProfilePictures.dto';
import { FindOneByWallet } from './dto/findOne.dto';
import { FindManyUsersDTO } from './dto/findMany.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(request: CreateUserDTO) {
        const { wallet } = request;

        const exist = await this.usersRepository.exist({
            where: { wallet },
        });

        if (exist) {
            throw new HttpException(
                { message: 'An account with this wallet already exists' },
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = this.usersRepository.create({
            wallet,
        });

        return await this.usersRepository.save(user);
    }

    async update(updateUserDTO: UpdateUserDTO) {
        const { wallet } = updateUserDTO;

        const user = await this.findOneByWallet({ wallet });

        Object.assign(user, updateUserDTO);

        return await this.usersRepository.save(user);
    }

    async delete(request: DeleteUserDTO) {
        const { wallet } = request;

        const user = await this.findOneByWallet({ wallet });

        return await this.usersRepository.remove(user);
    }

    async findOneByWallet(request: FindOneByWallet) {
        const { wallet } = request;

        try {
            return await this.usersRepository.findOneByOrFail({
                wallet,
            });
        } catch (error) {
            throw new HttpException(
                { message: "An account with that wallet wasn't found" },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findAll(request: FindManyUsersDTO) {
        const users = await this.usersRepository.find({
            where: request,
        });

        return { users };
    }

    async changeProfilePictures(request: ChangeProfilePicturesDTO) {
        const { wallet, profilePicture, backgroundPicture } = request;

        const user = await this.findOneByWallet({ wallet });

        if (profilePicture) {
            user.profilePicture = profilePicture;
        }

        if (backgroundPicture) {
            user.backgroundPicture = backgroundPicture;
        }

        return await this.usersRepository.save(user);
    }
}
