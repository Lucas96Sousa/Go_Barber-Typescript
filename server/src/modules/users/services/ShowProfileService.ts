import { injectable, inject } from 'tsyringe';

// Models
import User from '@modules/users/infra/typeorm/entities/User';

// ERROR
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

// Interfaces
interface IRequest {
    user_id: string;
}

// Class
@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}
