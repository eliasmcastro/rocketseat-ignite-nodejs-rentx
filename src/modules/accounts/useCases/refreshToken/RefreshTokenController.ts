import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refresh_token =
      request.body.refresh_token ||
      request.headers['x-access-token'] ||
      request.query.refresh_token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const new_tokens = await refreshTokenUseCase.execute(refresh_token);

    return response.json(new_tokens);
  }
}

export { RefreshTokenController };
