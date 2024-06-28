import { UsersRepository } from '@modules/accounts/infra/in-memory/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/in-memory/repositories/UsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/implementations/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepository;
let dateProvider: DayjsDateProvider;
let usersTokensRepository: UsersTokensRepository;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    dateProvider = new DayjsDateProvider();
    usersTokensRepository = new UsersTokensRepository();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepository.create({
      name: 'Blanche Curry',
      email: 'avzonbop@ospo.pr',
      password: '1234',
      driver_license: '664168',
    });

    await sendForgotPasswordMailUseCase.execute('avzonbop@ospo.pr');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ka@uj.gr'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepository, 'create');

    usersRepository.create({
      name: 'Leon Perkins',
      email: 'abome@regrog.ee',
      password: '1234',
      driver_license: '787330',
    });

    await sendForgotPasswordMailUseCase.execute('abome@regrog.ee');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
