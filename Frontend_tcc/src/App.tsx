import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer } from './components/common/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { SimuladorTechoTermico } from './components/simulators/SimuladorTechoTermico';
import { CalculadoraBTU } from './components/simulators/CalculadoraBTU';
import { SimuladorTemperaturaTanques } from './components/simulators/SimuladorTemperaturaTanques';
import { SimuladorVentilacionNocturna } from './components/simulators/SimuladorVentilacionNocturna';
import { SimuladorAcuicola } from './components/simulators/SimuladorAcuicola';
import { SimuladorSecadoArroz } from './components/simulators/SimuladorSecadoArroz';
import { SimuladorConsumoNevera } from './components/simulators/SimuladorConsumoNevera';
import { SimuladorCadenaFrio } from './components/simulators/SimuladorCadenaFrio';
import { SimuladorDeshidratadorSolar } from './components/simulators/SimuladorDeshidratadorSolar';
import { SimuladorEnfriamientoLeche } from './components/simulators/SimuladorEnfriamientoLeche';
import { useAuth } from './hooks/useAuth';
import './index.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [isDark, setIsDark] = React.useState(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      return true;
    }
    return false;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />

            {/* Protected Simulator Routes */}
            <Route
              path="/simuladores/techo-termico"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorTechoTermico />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/calculadora-btu"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <CalculadoraBTU />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/temperatura-tanques"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorTemperaturaTanques />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/ventilacion-nocturna"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorVentilacionNocturna />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/acuicola"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorAcuicola />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/secado-arroz"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorSecadoArroz />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/consumo-nevera"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorConsumoNevera />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/cadena-frio"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorCadenaFrio />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/deshidratador-solar"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorDeshidratadorSolar />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/simuladores/enfriamiento-leche"
              element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SimuladorEnfriamientoLeche />
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
