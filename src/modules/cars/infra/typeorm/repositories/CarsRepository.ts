import { Repository, getRepository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });
    return car;
  }
}

export { CarsRepository };
