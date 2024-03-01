import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ICreateCarDTO {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  specifications?: Specification[];
}

export { ICreateCarDTO };
