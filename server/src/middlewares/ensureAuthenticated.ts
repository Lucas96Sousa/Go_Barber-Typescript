import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// CONFIG
import authConfig from '../config/auth';

// ERROR
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // validação do jwt
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não encontrado', 401);
  }

  // Bearear auth

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}
