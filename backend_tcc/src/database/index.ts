import dotenv from 'dotenv';

dotenv.config();

export default {
  async execute() {
    return [[], []] as const;
  },
};

export async function testConnection() {
  console.log('🔌 Base de datos simulada: conexión omitida');
  return true;
}

export async function initializeDatabase() {
  console.log('🔧 Base de datos simulada: inicialización omitida');
  return true;
}
