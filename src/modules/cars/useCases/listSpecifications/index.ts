import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ListSpecificationsController } from './ListSpecificationsController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specificationsRepository = SpecificationsRepository.getInstance();
const listspecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository,
);
const listSpecificationsController = new ListSpecificationsController(
  listspecificationsUseCase,
);

export { listSpecificationsController };
