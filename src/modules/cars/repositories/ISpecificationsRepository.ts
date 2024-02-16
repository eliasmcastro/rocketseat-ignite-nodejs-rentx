import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/entities/Specification';

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;

  list(): Promise<Specification[]>;

  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
