import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
  cars: Car[] = [];

  async create({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });

    this.cars.push(car);

    return car;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]> {
    let availableCars = this.cars.filter(car => car.available);

    if (!name && !category_id && !brand) {
      return availableCars;
    }

    availableCars = availableCars.filter(car => {
      if (car.name === name) {
        return true;
      }
      if (car.category_id === category_id) {
        return true;
      }
      if (car.brand === brand) {
        return true;
      }
      return false;
    });

    return availableCars;
  }
}

export { CarsRepository };
