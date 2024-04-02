import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/in-memory/repositories/UsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepository;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'user@email.com',
      driver_license: '00012',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const session = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(session).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fake@email.com',
        password: 'naoexiste',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User test',
        email: 'user@email.com',
        driver_license: '00012',
        password: '123456',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
