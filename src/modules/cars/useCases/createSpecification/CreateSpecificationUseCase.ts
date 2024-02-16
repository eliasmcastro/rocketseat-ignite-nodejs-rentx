import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification Already exists.');
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
