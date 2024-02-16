import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const uploadCategories = multer(uploadConfig.upload('./tmp/uploads'));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post(
  '/import',
  uploadCategories.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
