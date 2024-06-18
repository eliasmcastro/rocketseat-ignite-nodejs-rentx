import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing.', 401);
  }

  const [, refresh_token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      refresh_token,
      auth.secret_refresh_token,
    ) as IPayload;

    const usersTokensRepository = new UsersTokensRepository();

    const user = usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      refresh_token,
    );

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token.', 401);
  }
}
