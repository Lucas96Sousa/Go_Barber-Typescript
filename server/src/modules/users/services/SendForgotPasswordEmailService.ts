import { injectable, inject } from 'tsyringe';
import path from 'path';

// ERROR
import AppError from '@shared/errors/AppError';

// INTEFACE
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const { token } = await this.userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Barber] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}
