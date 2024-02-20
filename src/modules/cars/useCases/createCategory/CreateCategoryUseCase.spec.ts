import { CategoriesRepository } from '@modules/cars/infra/in-memory/repositories/CategoriesRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepository;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepository.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category description test',
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
