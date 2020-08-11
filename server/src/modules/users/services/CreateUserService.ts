import { injectable, inject } from 'tsyringe';

// MODEL
import User from '@modules/users/infra/typeorm/entities/User';

// ERROR
import AppError from '@shared/errors/AppError';

// INTEFACE
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashedProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashedProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('O email já está sendo usado', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
