import { injectable, inject } from 'tsyringe';

// MODEL
// import User from '@modules/users/infra/typeorm/entities/User';

// ERROR
import AppError from '@shared/errors/AppError';

// INTEFACE
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('USer token does not exisits');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}
