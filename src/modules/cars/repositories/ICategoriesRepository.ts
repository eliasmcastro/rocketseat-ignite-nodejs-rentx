import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/entities/Category';

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;

  list(): Promise<Category[]>;

  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
