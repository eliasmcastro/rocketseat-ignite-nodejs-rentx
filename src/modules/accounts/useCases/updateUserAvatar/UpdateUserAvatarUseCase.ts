import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IAvatarUserDTO } from '../../dtos/IAvatarUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IAvatarUserDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
