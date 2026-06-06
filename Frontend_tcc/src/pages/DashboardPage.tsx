import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../components/common/FormComponents';
import {
  Thermometer,
  Wind,
  Refrigerator,
  Droplet,
  Fan,
  Fish,
  Leaf,
  Package,
  Sun,
  Milk,
} from 'lucide-react';

interface SimulatorCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
}

const simuladores: SimulatorCard[] = [
  {
    id: 'techo',
    name: 'Simulador Térmico de Techos',
    description: 'Analiza la transferencia de calor en diferentes materiales de techos',
    icon: <Thermometer className="w-6 h-6" />,
    route: '/simuladores/techo-termico',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'btu',
    name: 'Calculadora BTU',
    description: 'Calcula la capacidad necesaria de aire acondicionado',
    icon: <Wind className="w-6 h-6" />,
    route: '/simuladores/calculadora-btu',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'nevera',
    name: 'Consumo de Nevera',
    description: 'Estima el consumo energético y pérdidas de frío',
    icon: <Refrigerator className="w-6 h-6" />,
    route: '/simuladores/consumo-nevera',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'tanques',
    name: 'Temperatura de Tanques de Agua',
    description: 'Simula la evolución térmica de tanques durante el día',
    icon: <Droplet className="w-6 h-6" />,
    route: '/simuladores/temperatura-tanques',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'ventilacion',
    name: 'Ventilación Nocturna',
    description: 'Calcula enfriamiento por ventilación natural',
    icon: <Fan className="w-6 h-6" />,
    route: '/simuladores/ventilacion-nocturna',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'acuicola',
    name: 'Simulador Acuícola',
    description: 'Monitorea temperatura y oxígeno en estanques de peces',
    icon: <Fish className="w-6 h-6" />,
    route: '/simuladores/acuicola',
    color: 'from-green-500 to-cyan-500',
  },
  {
    id: 'arroz',
    name: 'Secado de Arroz',
    description: 'Optimiza energía para secado agroindustrial',
    icon: <Leaf className="w-6 h-6" />,
    route: '/simuladores/secado-arroz',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'frio',
    name: 'Cadena de Frío',
    description: 'Calcula conservación en transporte de pescado',
    icon: <Package className="w-6 h-6" />,
    route: '/simuladores/cadena-frio',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'solar',
    name: 'Deshidratador Solar',
    description: 'Simula secado térmico solar',
    icon: <Sun className="w-6 h-6" />,
    route: '/simuladores/deshidratador-solar',
    color: 'from-yellow-500 to-red-500',
  },
  {
    id: 'leche',
    name: 'Enfriamiento de Leche',
    description: 'Calcula sistemas de refrigeración para lácteos',
    icon: <Milk className="w-6 h-6" />,
    route: '/simuladores/enfriamiento-leche',
    color: 'from-green-400 to-blue-400',
  },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            TermoMagangué
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Plataforma de simuladores termodinámicos y de física para resolver problemas reales
            en Magangué, Bolívar. Diseñado para estudiantes, docentes y profesionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10</div>
            <p className="text-gray-600 dark:text-gray-400">Simuladores disponibles</p>
          </Card>

          <Card className="text-center p-6">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">∞</div>
            <p className="text-gray-600 dark:text-gray-400">Simulaciones sin límite</p>
          </Card>

          <Card className="text-center p-6">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              100%
            </div>
            <p className="text-gray-600 dark:text-gray-400">Gratuito y de código abierto</p>
          </Card>
        </div>
      </section>

      {/* Simulators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Nuestros Simuladores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simuladores.map((sim) => (
            <Link key={sim.id} to={sim.route}>
              <Card className="h-full hover:shadow-lg cursor-pointer">
                <div className="p-6 h-full flex flex-col">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${sim.color} text-white flex items-center justify-center mb-4`}
                  >
                    {sim.icon}
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    {sim.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                    {sim.description}
                  </p>

                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full mt-4"
                  >
                    Abrir Simulador
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 dark:bg-gray-800 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Características
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Autenticación Segura
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Registro e inicio de sesión con JWT
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Historial de Simulaciones
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Guarda tus simulaciones para consultarlas después
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Gráficos Interactivos
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Visualiza resultados con charts profesionales
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Exportar a PDF/Excel
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Descarga tus reportes en múltiples formatos
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Modo Oscuro
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Interfaz adaptada para diferentes preferencias
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Responsive Design
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Funciona perfectamente en móviles y desktop
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          ¿Listo para empezar?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Crea tu cuenta ahora y accede a todos los simuladores
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/registro">
            <Button variant="primary" size="lg">
              Registrarse
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
