import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { Milk } from 'lucide-react';

export const SimuladorEnfriamientoLeche: React.FC = () => {
  const [volumen, setVolumen] = useState('');
  const [temperaturaInicial, setTemperaturaInicial] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volumen || !temperaturaInicial) {
      alert('Por favor completa todos los campos');
      return;
    }

    const vol = parseFloat(volumen);
    const tempInicial = parseFloat(temperaturaInicial);
    const capacidad = vol * 1.03 * (tempInicial - 4) * 4.18;
    const potencia = (capacidad / 3600).toFixed(2);
    const tiempo = (capacidad / (parseFloat(potencia) * 3600)).toFixed(2);

    setResultado(
      `Potencia necesaria: ${potencia} kW\nTiempo de enfriamiento: ${tiempo} horas`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
            <Milk className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Enfriamiento de Leche
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Calcula sistemas de refrigeración para lácteos
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCalcular} className="space-y-4">
          <Input
            label="Volumen de Leche (litros)"
            type="number"
            placeholder="100"
            value={volumen}
            onChange={(e) => setVolumen(e.target.value)}
            step="10"
            min="0"
          />

          <Input
            label="Temperatura Inicial (°C)"
            type="number"
            placeholder="35"
            value={temperaturaInicial}
            onChange={(e) => setTemperaturaInicial(e.target.value)}
            step="0.5"
          />

          <Button type="submit" className="w-full">
            Calcular Sistema de Refrigeración
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
