import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;

  findById(id: string): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;

  findAvailable(
    name?: string,
    category_id?: string,
    brand?: string,
  ): Promise<Car[]>;

  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
