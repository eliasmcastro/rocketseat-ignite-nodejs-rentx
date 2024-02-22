import { CarsRepository } from '@modules/cars/infra/in-memory/repositories/CarsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      category_id: 'abc-123',
      name: 'Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand',
    });

    expect(car).toHaveProperty('id');
  });

  it('should be able to create a car with exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        category_id: 'abc-123',
        name: 'Car 1',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 40,
        brand: 'Brand',
      });

      await createCarUseCase.execute({
        category_id: 'abc-123',
        name: 'Car 2',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 40,
        brand: 'Brand',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      category_id: 'abc-123',
      name: 'Car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Brand',
    });

    expect(car.available).toBe(true);
  });
});
