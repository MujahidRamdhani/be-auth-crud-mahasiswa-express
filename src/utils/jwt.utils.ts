import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Logger from '../pkg/logger';
import { prisma } from './prisma.utils';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET';
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface UserPayload {
  id: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export function createAccessToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN });
}

export function createRefreshToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

export function verifyAccessToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as UserPayload;
  } catch (err) {
    Logger.error(`verifyAccessToken: Invalid token - ${err}`);
    return null;
  }
}

export function verifyRefreshToken(refreshToken: string): UserPayload | null {
  try {
    return jwt.verify(refreshToken, JWT_REFRESH_SECRET) as UserPayload;
  } catch (err) {
    Logger.error(`verifyRefreshToken: Invalid refresh token - ${err}`);
    return null;
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token tidak ditemukan' });
    return;
  }

  const user = verifyAccessToken(token);

  if (!user) {
    res.status(401).json({ message: 'Token tidak valid' });
    return;
  }

  const blokirToken = await prisma.blokirToken.findFirst({
    where: {
      token: token,
    },
  });

  if (blokirToken) {
    res.status(401).json({ message: 'Token telah diblokir' });
    return;
  }

  (req as AuthenticatedRequest).user = user;
  next();
}

export function refreshTokenHandler(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  const user = verifyRefreshToken(refreshToken);
  if (!user) {
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }

  const newAccessToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken(user);

  return res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
}
