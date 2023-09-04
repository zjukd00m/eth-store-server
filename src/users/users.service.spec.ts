// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from './users.entity';
// import { Repository } from 'typeorm';
// import { ethers } from 'ethers';
// import { randomUUID } from 'crypto';

// const getUserStub = (): User => {
//     const user = new User();

//     user.id = randomUUID().toString();
//     user.wallet = ethers.Wallet.createRandom().address;
//     user.confirmed = false;
//     user.email = null;
//     user.profilePicture = null;
//     user.backgroundPicture = null;
//     user.notifications = false;

//     return user;
// };

// describe('User service', () => {
//     let service: UsersService;
//     let repo: Repository<User>;
//     let userStub: User;

//     beforeAll(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 // ...databaseProviders,
//                 UsersService,
//                 {
//                     // provide: USERS_REPOSITORY,
//                     provide: getRepositoryToken(User),
//                     useClass: Repository,
//                 },
//             ],
//         }).compile();

//         service = module.get<UsersService>(UsersService);

//         repo = module.get<Repository<User>>(getRepositoryToken(User));

//         userStub = getUserStub();
//     });

//     describe('Test user service', () => {
//         it('should be defined', () => {
//             expect(service).toBeDefined();
//         });

//         it('Should create a new user', async () => {
//             const createdAt = new Date();

//             jest.spyOn(repo, 'exist').mockReturnValue(Promise.resolve(false));
//             jest.spyOn(repo, 'create').mockReturnValue({
//                 ...userStub,
//                 id: null,
//             });
//             jest.spyOn(repo, 'save').mockReturnValue(
//                 Promise.resolve({ ...userStub, createdAt }),
//             );

//             const user = await service.create({ wallet: userStub.wallet });

//             expect(user).toBeDefined();
//             expect(user).toEqual({ ...userStub, createdAt });

//             expect(repo.exist).toHaveBeenCalled();
//             expect(repo.create).toHaveBeenCalled();
//             expect(repo.save).toHaveBeenCalled();
//         });

//         it("Shouldn't create an user with a taken wallet", async () => {
//             jest.spyOn(repo, 'exist').mockReturnValue(Promise.resolve(true));

//             await expect(
//                 service.create({ wallet: userStub.wallet }),
//             ).rejects.toThrowError(
//                 Error('An account with this wallet already exists'),
//             );

//             expect(repo.exist).toHaveBeenCalled();
//         });

//         it('Should delete the user account', async () => {
//             jest.spyOn(repo, 'findOneByOrFail').mockReturnValue(
//                 Promise.resolve(userStub),
//             );

//             jest.spyOn(repo, 'remove').mockReturnValue(
//                 Promise.resolve({ ...userStub, id: null }),
//             );

//             const user = await service.delete({ wallet: userStub.wallet });

//             expect(user).toBeDefined();
//             expect(user).toEqual({ ...userStub, id: null });

//             expect(repo.findOneByOrFail).toHaveBeenCalled();
//             expect(repo.remove).toHaveBeenCalled();
//         });

//         it('Should edit an existing user account', async () => {
//             const updateRequest = {
//                 email: 'tyler_durden@protonmail.com',
//                 notifications: true,
//             };

//             jest.spyOn(repo, 'findOneByOrFail').mockReturnValue(
//                 Promise.resolve(userStub),
//             );

//             jest.spyOn(repo, 'save').mockReturnValue(
//                 Promise.resolve({
//                     ...userStub,
//                     ...updateRequest,
//                 }),
//             );

//             const user = await service.update({
//                 wallet: userStub.wallet,
//             });

//             expect(user).toBeDefined();
//             expect(user).toEqual({
//                 ...userStub,
//                 ...updateRequest,
//             });

//             expect(repo.findOneByOrFail).toHaveBeenCalled();
//             expect(repo.save).toHaveBeenCalled();
//         });
//     });
// });
