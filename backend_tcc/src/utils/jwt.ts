import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/index.js';

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
  const secret = process.env.JWT_SECRET || 'your_secret_key';

  return jwt.sign(
    payload,
    secret,
    {
      expiresIn: '7d'
    } as any
  );
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET || 'your_secret_key';
    return jwt.verify(token, secret) as JWTPayload;
  } catch {
    return null;
  }
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}