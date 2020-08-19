import { injectable, inject } from 'tsyringe';

// Models
import User from '@modules/users/infra/typeorm/entities/User';

// Config

// ERROR
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StoragedProviders/models/IstorageProvider';
// Interfaces
interface IRequest {
    user_id: string;
    avatarFilename: string;
}

// Class
@injectable()
export default class UpadteUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Apenas usuários autencidados podem mudar o avatar',
                401,
            );
        }

        if (user.avatar) {
            // Deletar avatar anterior

            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        await this.usersRepository.save(user);

        return user;
    }
}
