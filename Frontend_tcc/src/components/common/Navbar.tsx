import React from 'react';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const { usuario, logout } = useAuth();

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              TermoMagangué
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/simuladores" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Simuladores
            </Link>
            {/* <Link to="/historial" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Historial
            </Link> */}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {usuario ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300">{usuario.nombre}</span>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/simuladores"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Simuladores
            </Link>
            <Link
              to="/historial"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Historial
            </Link>
            {usuario ? (
              <>
                <div className="px-4 py-2 text-gray-700 dark:text-gray-300">{usuario.nombre}</div>
                <button
                  onClick={() => logout()}
                  className="w-full text-left px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">TermoMagangué</h3>
            <p className="text-gray-400">
              Simuladores termodinámicos para resolver problemas reales en Magangué, Bolívar.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/simuladores" className="hover:text-blue-400">Simuladores</Link></li>
              <li><Link to="/historial" className="hover:text-blue-400">Historial</Link></li>
              <li><a href="/api-docs" className="hover:text-blue-400">Documentación API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Información</h4>
            <p className="text-gray-400 text-sm">
              Email: info@thermomagangue.com<br />
              Magangué, Bolívar, Colombia
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} TermoMagangué. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
