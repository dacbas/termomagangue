import axios, { AxiosInstance } from 'axios';
import { ApiResponse, PaginatedResponse, Usuario, Simulacion } from '../types/index';

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Agregar interceptor para token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Autenticación
  async registro(nombre: string, correo: string, contraseña: string, rol?: string) {
    return this.api.post<ApiResponse<{ usuario: Usuario; token: string }>>('/auth/registro', {
      nombre,
      correo,
      contraseña,
      rol: rol || 'estudiante',
    });
  }

  async login(correo: string, contraseña: string) {
    return this.api.post<ApiResponse<{ usuario: Usuario; token: string }>>('/auth/login', {
      correo,
      contraseña,
    });
  }

  async obtenerPerfil() {
    return this.api.get<ApiResponse<Usuario>>('/usuarios/me');
  }

  // Simulaciones
  async crearSimulacion(tipo: string, titulo: string, parametros: any, resultados: any) {
    return this.api.post<ApiResponse<Simulacion>>('/simulaciones', {
      tipo,
      titulo,
      parametros,
      resultados,
    });
  }

  async obtenerSimulacion(id: number) {
    return this.api.get<ApiResponse<Simulacion>>(`/simulaciones/${id}`);
  }

  async listarSimulaciones(limit: number = 20, offset: number = 0) {
    return this.api.get<ApiResponse<PaginatedResponse<Simulacion>>>('/simulaciones', {
      params: { limit, offset },
    });
  }

  // Usuarios (admin)
  async listarUsuarios(limit: number = 10, offset: number = 0) {
    return this.api.get<ApiResponse<PaginatedResponse<Usuario>>>('/usuarios', {
      params: { limit, offset },
    });
  }
}

export default new APIService();
