import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Alert } from '../components/common/FormComponents';
import { useAuth } from '../hooks/useAuth';
import apiService from '../services/api';
import { Mail, Lock, User } from 'lucide-react';

export const RegistroPage: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [rol, setRol] = useState<'estudiante' | 'docente' | 'habitante'>('estudiante');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nombre || !correo || !contraseña || !confirmarContraseña) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.registro(nombre, correo, contraseña, rol);

      if (response.data.success && response.data.data) {
        setSuccess('Registro exitoso. Redirigiendo...');
        login(response.data.data.usuario, response.data.data.token);
        setTimeout(() => navigate('/simuladores'), 1500);
      } else {
        setError(response.data.message || 'Error al registrar');
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
            Crea tu cuenta para acceder a los simuladores
          </p>

          {error && <Alert type="error" title="Error" onClose={() => setError(null)}>{error}</Alert>}
          {success && <Alert type="success" title="Éxito">{success}</Alert>}

          <form onSubmit={handleRegistro} className="space-y-4">
            <Input
              label="Nombre Completo"
              icon={<User size={18} />}
              type="text"
              placeholder="Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={isLoading}
            />

            <Input
              label="Correo Electrónico"
              icon={<Mail size={18} />}
              type="email"
              placeholder="tu@email.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              disabled={isLoading}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Usuario
              </label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value as any)}
                disabled={isLoading}
                className="input"
              >
                <option value="estudiante">Estudiante de Ingeniería</option>
                <option value="docente">Docente</option>
                <option value="habitante">Habitante de Magangué</option>
              </select>
            </div>

            <Input
              label="Contraseña"
              icon={<Lock size={18} />}
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              disabled={isLoading}
            />

            <Input
              label="Confirmar Contraseña"
              icon={<Lock size={18} />}
              type="password"
              placeholder="Confirma tu contraseña"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              disabled={isLoading}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Registrarse
            </Button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
