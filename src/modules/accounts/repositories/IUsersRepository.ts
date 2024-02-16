import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
