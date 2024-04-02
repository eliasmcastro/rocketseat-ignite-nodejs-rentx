import { CarsRepository } from '@modules/cars/infra/in-memory/repositories/CarsRepository';
import { SpecificationsRepository } from '@modules/cars/infra/in-memory/repositories/SpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepository;
let specificationsRepository: SpecificationsRepository;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    specificationsRepository = new SpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository,
    );
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['54321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toEqual(new AppError('Car does not exists!'));
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      category_id: 'abc-123',
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
    });

    const specification = await specificationsRepository.create({
      name: 'test',
      description: 'test',
    });

    const specifications_id = [specification.id];

    const carsSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(carsSpecifications).toHaveProperty('specifications');
    expect(carsSpecifications.specifications.length).toBe(1);
  });
});
