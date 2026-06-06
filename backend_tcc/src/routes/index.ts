import { Router } from 'express';
import { UsuarioController, SimulacionController } from '../controllers/index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

// Rutas de autenticación (públicas)
router.post('/auth/registro', UsuarioController.registro);
router.post('/auth/login', UsuarioController.login);

// Rutas de usuarios (protegidas)
router.get('/usuarios/me', authMiddleware, UsuarioController.obtenerPerfil);
router.get('/usuarios', authMiddleware, adminMiddleware, UsuarioController.listar);

// Rutas de simulaciones (protegidas)
router.post('/simulaciones', authMiddleware, SimulacionController.crear);
router.get('/simulaciones/:id', authMiddleware, SimulacionController.obtener);
router.get('/simulaciones', authMiddleware, SimulacionController.listar);

export default router;
