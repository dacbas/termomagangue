import { Usuario, SimulationType } from '../types/index.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

interface UsuarioDB extends Usuario {
  contraseña: string;
  fechaRegistro: Date;
}

const usuarios: UsuarioDB[] = [];
let nextUsuarioId = 1;

interface SimulacionDB {
  id: number;
  usuarioId: number;
  tipo: SimulationType;
  titulo: string;
  parametros: string;
  resultados: string;
  fecha: Date;
  actualizado: Date;
}

const simulaciones: SimulacionDB[] = [];
let nextSimulacionId = 1;

interface HistorialDB {
  id: number;
  simulacionId: number;
  accion: string;
  detalles?: string;
  fecha: Date;
}

const historial: HistorialDB[] = [];
let nextHistorialId = 1;

function sanitizeUsuario(usuario: UsuarioDB): Usuario {
  const { contraseña, ...rest } = usuario;
  return rest;
}

function findUsuarioDBByEmail(correo: string): UsuarioDB | undefined {
  return usuarios.find((usuario) => usuario.correo === correo);
}

function findUsuarioDBById(id: number): UsuarioDB | undefined {
  return usuarios.find((usuario) => usuario.id === id);
}

export class UsuarioModel {
  static async crear(usuario: Usuario): Promise<Usuario> {
    const { nombre, correo, contraseña = '', rol = 'estudiante' } = usuario;
    const hashedPassword = await hashPassword(contraseña);

    const nuevoUsuario: UsuarioDB = {
      id: nextUsuarioId++,
      nombre,
      correo,
      contraseña: hashedPassword,
      rol,
      fechaRegistro: new Date(),
      activo: true,
    };

    usuarios.push(nuevoUsuario);

    return sanitizeUsuario(nuevoUsuario);
  }

  static async findByEmail(correo: string): Promise<Usuario | null> {
    const usuario = findUsuarioDBByEmail(correo);
    return usuario ? sanitizeUsuario(usuario) : null;
  }

  static async findById(id: number): Promise<Usuario | null> {
    const usuario = findUsuarioDBById(id);
    return usuario ? sanitizeUsuario(usuario) : null;
  }

  static async verificarCredenciales(
    correo: string,
    contraseña: string
  ): Promise<{ token: string; usuario: Usuario } | null> {
    const usuario = findUsuarioDBByEmail(correo);

    if (!usuario) return null;

    const passwordMatch = await comparePassword(contraseña, usuario.contraseña);
    if (!passwordMatch) return null;

    const token = generateToken({
      id: usuario.id!,
      correo: usuario.correo,
      rol: usuario.rol,
    });
    return {
      token,
      usuario: sanitizeUsuario(usuario),
    };
  }

  static async getAll(limit: number = 10, offset: number = 0) {
    const data = usuarios
      .slice(offset, offset + limit)
      .map((usuario) => sanitizeUsuario(usuario));

    return {
      data,
      total: usuarios.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(usuarios.length / limit),
    };
  }

  static async actualizar(id: number, datos: Partial<Usuario>): Promise<boolean> {
    const usuario = findUsuarioDBById(id);
    if (!usuario) return false;

    if (datos.nombre) usuario.nombre = datos.nombre;
    if (datos.rol) usuario.rol = datos.rol;
    if (datos.activo !== undefined) usuario.activo = datos.activo;

    return true;
  }

  static async eliminar(id: number): Promise<boolean> {
    const index = usuarios.findIndex((usuario) => usuario.id === id);
    if (index === -1) return false;

    usuarios.splice(index, 1);
    return true;
  }
}

export class SimulacionModel {
  static async crear(usuarioId: number, datos: any): Promise<any> {
    const { tipo, titulo, parametros, resultados } = datos;
    const now = new Date();

    const nuevaSimulacion: SimulacionDB = {
      id: nextSimulacionId++,
      usuarioId,
      tipo,
      titulo: titulo || `Simulación ${tipo}`,
      parametros: JSON.stringify(parametros),
      resultados: JSON.stringify(resultados),
      fecha: now,
      actualizado: now,
    };

    simulaciones.push(nuevaSimulacion);

    return {
      id: nuevaSimulacion.id,
      usuarioId,
      tipo: nuevaSimulacion.tipo,
      titulo: nuevaSimulacion.titulo,
      parametros,
      resultados,
      fecha: nuevaSimulacion.fecha,
      actualizado: nuevaSimulacion.actualizado,
    };
  }

  static async findById(id: number): Promise<any | null> {
    const simulacion = simulaciones.find((item) => item.id === id);
    if (!simulacion) return null;

    return {
      id: simulacion.id,
      usuarioId: simulacion.usuarioId,
      tipo: simulacion.tipo,
      titulo: simulacion.titulo,
      parametros: JSON.parse(simulacion.parametros),
      resultados: JSON.parse(simulacion.resultados),
      fecha: simulacion.fecha,
      actualizado: simulacion.actualizado,
    };
  }

  static async findByUsuario(usuarioId: number, limit: number = 20, offset: number = 0): Promise<any> {
    const filtradas = simulaciones
      .filter((item) => item.usuarioId === usuarioId)
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

    const data = filtradas.slice(offset, offset + limit).map((simulacion) => ({
      id: simulacion.id,
      usuarioId: simulacion.usuarioId,
      tipo: simulacion.tipo,
      titulo: simulacion.titulo,
      parametros: JSON.parse(simulacion.parametros),
      resultados: JSON.parse(simulacion.resultados),
      fecha: simulacion.fecha,
      actualizado: simulacion.actualizado,
    }));

    return {
      data,
      total: filtradas.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(filtradas.length / limit),
    };
  }

  static async actualizar(id: number, datos: any): Promise<boolean> {
    const simulacion = simulaciones.find((item) => item.id === id);
    if (!simulacion) return false;

    if (datos.titulo) simulacion.titulo = datos.titulo;
    if (datos.resultados) simulacion.resultados = JSON.stringify(datos.resultados);
    simulacion.actualizado = new Date();

    return true;
  }

  static async eliminar(id: number): Promise<boolean> {
    const index = simulaciones.findIndex((item) => item.id === id);
    if (index === -1) return false;

    simulaciones.splice(index, 1);
    return true;
  }
}

export class HistorialModel {
  static async crear(simulacionId: number, accion: string, detalles?: any): Promise<any> {
    const nuevaEntrada: HistorialDB = {
      id: nextHistorialId++,
      simulacionId,
      accion,
      detalles: detalles ? JSON.stringify(detalles) : undefined,
      fecha: new Date(),
    };

    historial.push(nuevaEntrada);

    return {
      ...nuevaEntrada,
      detalles: detalles || null,
    };
  }

  static async findBySimulacion(simulacionId: number): Promise<any[]> {
    return historial
      .filter((item) => item.simulacionId === simulacionId)
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
      .map((item) => ({
        ...item,
        detalles: item.detalles ? JSON.parse(item.detalles) : null,
      }));
  }
}
