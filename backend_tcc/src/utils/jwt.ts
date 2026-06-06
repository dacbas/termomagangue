import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/index.js';

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
  const secret = process.env.JWT_SECRET || 'your_secret_key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.JWT_SECRET || 'your_secret_key';
    const decoded = jwt.verify(token, secret) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
