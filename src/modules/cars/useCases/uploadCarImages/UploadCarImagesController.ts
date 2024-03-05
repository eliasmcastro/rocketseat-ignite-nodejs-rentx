import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IFilesDTO } from '@modules/cars/dtos/IFilesDTO';

import { UploadCarImagesUseCase } from './UploadCarImageUseCase';

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFilesDTO[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map(file => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
