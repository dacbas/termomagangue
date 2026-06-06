import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { Fan } from 'lucide-react';

export const SimuladorVentilacionNocturna: React.FC = () => {
  const [temperatura, setTemperatura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!temperatura || !humedad) {
      alert('Por favor completa todos los campos');
      return;
    }

    const temp = parseFloat(temperatura);
    const hum = parseFloat(humedad);
    const enfriamiento = temp * (hum / 100) * 0.85;

    setResultado(`Enfriamiento estimado: ${enfriamiento.toFixed(2)}°C`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Fan className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ventilación Nocturna
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Calcula el enfriamiento disponible por ventilación natural nocturna
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCalcular} className="space-y-4">
          <Input
            label="Temperatura Exterior (°C)"
            type="number"
            placeholder="25"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
            step="0.1"
          />

          <Input
            label="Humedad Relativa (%)"
            type="number"
            placeholder="70"
            value={humedad}
            onChange={(e) => setHumedad(e.target.value)}
            step="0.1"
            min="0"
            max="100"
          />

          <Button type="submit" className="w-full">
            Calcular Enfriamiento
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
