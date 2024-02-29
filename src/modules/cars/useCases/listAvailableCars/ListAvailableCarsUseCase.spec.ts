import { CarsRepository } from '@modules/cars/infra/in-memory/repositories/CarsRepository';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepository.create({
      category_id: 'abc-123',
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      category_id: 'abc-123',
      name: 'Car3',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1235',
      fine_amount: 40,
      brand: 'Car_brand_test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car3',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepository.create({
      category_id: 'abc-123',
      name: 'Car3',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1235',
      fine_amount: 40,
      brand: 'Car_brand_test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'abc-123',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepository.create({
      category_id: 'abc-123',
      name: 'Car2',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand_test',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand_test',
    });

    expect(cars).toEqual([car]);
  });
});
