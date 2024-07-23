import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

import { AppError } from '@shared/errors/AppError';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const redisClient = await createClient().connect();

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    useRedisPackage: true,
    keyPrefix: 'rateLimiter',
    points: 10, // número de requisições
    duration: 5, // tempo em segundos
  });

  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
