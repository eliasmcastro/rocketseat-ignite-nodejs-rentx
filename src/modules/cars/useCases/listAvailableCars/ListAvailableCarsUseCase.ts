import { inject, injectable } from 'tsyringe';

import { IListAvailableCarsDTO } from '@modules/cars/dtos/IListAvailableCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    category_id,
    brand,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      category_id,
      brand,
    );
    return cars;
  }
}

export { ListAvailableCarsUseCase };
