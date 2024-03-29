import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IAuthenticateUserRequestDTO } from '@modules/accounts/dtos/IAuthenticateUserRequestDTO';
import { IAuthenticateUserResponseDTO } from '@modules/accounts/dtos/IAuthenticateUserResponseDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequestDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect.');
    }

    const token = sign({}, 'a21c8e2a03f49f7366b0110c7f761b54', {
      subject: user.id,
      expiresIn: '1d',
    });

    const session: IAuthenticateUserResponseDTO = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return session;
  }
}

export { AuthenticateUserUseCase };
