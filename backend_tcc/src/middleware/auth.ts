import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

export interface AuthenticatedRequest extends Request {
  usuario?: {
    id: number;
    correo: string;
    rol: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado',
      error: 'No authorization token found',
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      error: 'Invalid or expired token',
    });
  }

  req.usuario = {
    id: decoded.id,
    correo: decoded.correo,
    rol: decoded.rol,
  };

  next();
}

export function adminMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requieren permisos de administrador',
      error: 'Admin access required',
    });
  }

  next();
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}
