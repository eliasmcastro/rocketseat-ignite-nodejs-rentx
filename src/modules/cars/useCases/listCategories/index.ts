import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const listcategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listcategoriesUseCase,
);

export { listCategoriesController };
