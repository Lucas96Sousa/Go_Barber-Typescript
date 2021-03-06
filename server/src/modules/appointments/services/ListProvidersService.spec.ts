import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('List Providers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('Should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'johntre@example.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John',
            email: 'john@example.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
    /*
    it('Should not be able to show profile with non-existing user id', async () => {
        expect(
            showProfile.execute({
                user_id: 'non-existing user id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    }); */
});
