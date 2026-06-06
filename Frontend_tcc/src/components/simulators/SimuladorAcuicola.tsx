import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { Fish } from 'lucide-react';

export const SimuladorAcuicola: React.FC = () => {
  const [profundidad, setProfundidad] = useState('');
  const [volumen, setVolumen] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profundidad || !volumen) {
      alert('Por favor completa todos los campos');
      return;
    }

    const prof = parseFloat(profundidad);
    const vol = parseFloat(volumen);
    const oxigeno = (vol * prof * 0.21).toFixed(2);

    setResultado(`Oxígeno disponible estimado: ${oxigeno} m³`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <Fish className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Simulador Acuícola
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Monitorea temperatura y oxígeno en estanques de peces
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCalcular} className="space-y-4">
          <Input
            label="Profundidad del Estanque (m)"
            type="number"
            placeholder="2"
            value={profundidad}
            onChange={(e) => setProfundidad(e.target.value)}
            step="0.1"
          />

          <Input
            label="Volumen de Agua (m³)"
            type="number"
            placeholder="100"
            value={volumen}
            onChange={(e) => setVolumen(e.target.value)}
            step="0.1"
          />

          <Button type="submit" className="w-full">
            Calcular Parámetros
          </Button>
        </form>
      </Card>

      {resultado && (
        <Alert type="success" title="Resultado">
          {resultado}
        </Alert>
      )}
    </div>
  );
};
