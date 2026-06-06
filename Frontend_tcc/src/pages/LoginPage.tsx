import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Alert } from '../components/common/FormComponents';
import { useAuth } from '../hooks/useAuth';
import apiService from '../services/api';
import { Mail, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!correo || !contraseña) {
      setError('Correo y contraseña son requeridos');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.login(correo, contraseña);

      if (response.data.success && response.data.data) {
        login(response.data.data.usuario, response.data.data.token);
        navigate('/simuladores');
      } else {
        setError(response.data.message || 'Error al iniciar sesión');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Error al conectar con el servidor'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
            TermoMagangué
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Inicia sesión para acceder a los simuladores
          </p>

          {error && <Alert type="error" title="Error de Inicio de Sesión">{error}</Alert>}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Correo Electrónico"
              icon={<Mail size={18} />}
              type="email"
              placeholder="tu@email.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={isLoading}
            />

            <Input
              label="Contraseña"
              icon={<Lock size={18} />}
              type="password"
              placeholder="Tu contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              disabled={isLoading}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Iniciar Sesión
            </Button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            ¿No tienes cuenta?{' '}
            <Link
              to="/registro"
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
