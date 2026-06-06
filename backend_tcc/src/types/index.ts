// Types for the application
export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  contraseña?: string;
  rol: 'estudiante' | 'docente' | 'admin' | 'habitante';
  fechaRegistro?: Date;
  activo?: boolean;
}

export interface LoginRequest {
  correo: string;
  contraseña: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface SimulacionBase {
  id?: number;
  usuarioId: number;
  tipo: SimulationType;
  fecha?: Date;
  parametros: Record<string, any>;
  resultados: Record<string, any>;
  titulo?: string;
}

export type SimulationType =
  | 'techo_termico'
  | 'calculadora_btu'
  | 'consumo_nevera'
  | 'temperatura_tanques'
  | 'ventilacion_nocturna'
  | 'acuicola'
  | 'secado_arroz'
  | 'cadena_frio'
  | 'deshidratador_solar'
  | 'enfriamiento_leche';

export interface Historial {
  id?: number;
  simulacionId: number;
  accion: string;
  fecha?: Date;
  detalles?: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JWTPayload {
  id: number;
  correo: string;
  rol: string;
  iat?: number;
  exp?: number;
}
