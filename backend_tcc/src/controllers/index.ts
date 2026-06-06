import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { UsuarioModel, SimulacionModel } from '../models/index.js';

export class UsuarioController {
  static async registro(req: AuthenticatedRequest, res: Response) {
    try {
      const { nombre, correo, contraseña, rol } = req.body;

      if (!nombre || !correo || !contraseña) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, correo y contraseña son requeridos',
        });
      }

      const usuarioExistente = await UsuarioModel.findByEmail(correo);
      if (usuarioExistente) {
        return res.status(400).json({
          success: false,
          message: 'El correo ya está registrado',
        });
      }

      const usuario = await UsuarioModel.crear({
        nombre,
        correo,
        contraseña,
        rol: rol || 'estudiante',
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: usuario,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al registrar usuario',
        error: error.message,
      });
    }
  }

  static async login(req: AuthenticatedRequest, res: Response) {
    try {
      const { correo, contraseña } = req.body;

      if (!correo || !contraseña) {
        return res.status(400).json({
          success: false,
          message: 'Correo y contraseña son requeridos',
        });
      }

      const resultado = await UsuarioModel.verificarCredenciales(correo, contraseña);

      if (!resultado) {
        return res.status(401).json({
          success: false,
          message: 'Correo o contraseña incorrectos',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: resultado,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión',
        error: error.message,
      });
    }
  }

  static async obtenerPerfil(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
      }

      const usuario = await UsuarioModel.findById(req.usuario.id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Perfil obtenido',
        data: usuario,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener perfil',
        error: error.message,
      });
    }
  }

  static async listar(req: AuthenticatedRequest, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const resultado = await UsuarioModel.getAll(limit, offset);

      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos',
        data: resultado,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al listar usuarios',
        error: error.message,
      });
    }
  }
}

export class SimulacionController {
  static async crear(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
      }

      const { tipo, titulo, parametros, resultados } = req.body;

      if (!tipo || !parametros || !resultados) {
        return res.status(400).json({
          success: false,
          message: 'Tipo, parámetros y resultados son requeridos',
        });
      }

      const simulacion = await SimulacionModel.crear(req.usuario.id, {
        tipo,
        titulo,
        parametros,
        resultados,
      });

      res.status(201).json({
        success: true,
        message: 'Simulación guardada',
        data: simulacion,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al crear simulación',
        error: error.message,
      });
    }
  }

  static async obtener(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
      }

      const id = parseInt(req.params.id, 10);
      const simulacion = await SimulacionModel.findById(id);

      if (!simulacion) {
        return res.status(404).json({
          success: false,
          message: 'Simulación no encontrada',
        });
      }

      if (simulacion.usuarioId !== req.usuario.id) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para ver esta simulación',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Simulación obtenida',
        data: simulacion,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener simulación',
        error: error.message,
      });
    }
  }

  static async listar(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
      }

      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const resultado = await SimulacionModel.findByUsuario(req.usuario.id, limit, offset);

      res.status(200).json({
        success: true,
        message: 'Simulaciones obtenidas',
        data: resultado,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error al listar simulaciones',
        error: error.message,
      });
    }
  }
}
