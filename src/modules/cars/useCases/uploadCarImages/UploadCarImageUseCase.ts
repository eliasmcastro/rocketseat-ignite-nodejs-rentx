import { inject, injectable } from 'tsyringe';

import { IUploadCarImagesDTO } from '@modules/cars/dtos/IUploadCarImagesDTO';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IUploadCarImagesDTO): Promise<void> {
    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImagesUseCase };
