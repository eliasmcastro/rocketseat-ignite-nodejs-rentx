import { inject, injectable } from 'tsyringe';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists.');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
