import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;

  list(): Promise<Specification[]>;

  findByIds(ids: string[]): Promise<Specification[]>;

  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
