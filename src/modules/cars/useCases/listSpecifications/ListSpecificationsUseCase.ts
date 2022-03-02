import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
