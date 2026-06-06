// Tipos de Usuario
export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  rol: 'estudiante' | 'docente' | 'admin' | 'habitante';
  fechaRegistro?: Date;
  activo?: boolean;
}

export interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Tipos de Simulaciones
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

export interface Simulacion {
  id?: number;
  usuarioId: number;
  tipo: SimulationType;
  titulo?: string;
  fecha?: Date;
  parametros: Record<string, any>;
  resultados: Record<string, any>;
}

export interface Historial {
  id?: number;
  simulacionId: number;
  accion: string;
  fecha?: Date;
  detalles?: Record<string, any>;
}

// Respuestas API
export interface ApiResponse<T = any> {
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

// Simulador Térmico de Techos
export interface TechoTermicoParams {
  temperaturaExterior: number;
  hora: number;
  materialTecho: 'zinc' | 'fibrocemento' | 'concreto';
  alturaHabitacion: number;
}

export interface TechoTermicoResult {
  temperaturaInterior: number;
  transferenciaCal: number;
  potenciaTotal: number;
  recomendaciones: string[];
}

// Calculadora BTU
export interface CalculadoraBTUParams {
  largo: number;
  ancho: number;
  altura: number;
  ventanas: number;
  personas: number;
  equiposElectronicos: number;
}

export interface CalculadoraBTUResult {
  btuRecomendado: number;
  capacidadMinima: number;
  capacidadOptima: number;
  consumoMensual: number;
  costoMensual: number;
  recomendaciones: string[];
}

// Consumo de Nevera
export interface ConsumoNeveraParams {
  temperaturaAmbiente: number;
  volumenNevera: number;
  aperturasDialas: number;
  tiempoAbiertaPromedio: number;
}

export interface ConsumoNeveraResult {
  energiaPerdida: number;
  consumoAdicional: number;
  costoMensual: number;
  consejos: string[];
}

// Temperatura de Tanques
export interface TemperaturaTanqueParams {
  volumenTanque: number;
  colorTanque: 'negro' | 'gris' | 'blanco';
  temperaturaAmbiente: number;
}

export interface TemperaturaTanqueResult {
  temperaturasHorarias: number[];
  horaMaximaTemperatura: number;
  temperaturaMaxima: number;
  conPolisombra: number[];
  recomendaciones: string[];
}

// Acuícola
export interface AcuicolaParams {
  volumenEstanque: number;
  temperaturaAmbiente: number;
  velocidadViento: number;
  radiacionSolar: number;
}

export interface AcuicolaResult {
  temperaturaFutura: number;
  nivelOxigeno: number;
  alertas: string[];
  recomendaciones: string[];
}

// Enfriamiento de Leche
export interface EnfriamientoLecheParams {
  volumenLeche: number;
  temperaturaInicial: number;
  temperaturaDeseada: number;
  metodoEnfriamiento: 'ventilador' | 'hielo' | 'refrigerante';
}

export interface EnfriamientoLecheResult {
  potenciaRequerida: number;
  tiempoEnfriamiento: number;
  costoOperacion: number;
  equipoRecomendado: string;
  recomendaciones: string[];
}

// Thema App
export type Theme = 'light' | 'dark' | 'auto';
