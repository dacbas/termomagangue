import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { Package } from 'lucide-react';

export const SimuladorCadenaFrio: React.FC = () => {
  const [temperaturaInicial, setTemperaturaInicial] = useState('');
  const [tiempoTransporte, setTiempoTransporte] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!temperaturaInicial || !tiempoTransporte) {
      alert('Por favor completa todos los campos');
      return;
    }

    const temp = parseFloat(temperaturaInicial);
    const tiempo = parseFloat(tiempoTransporte);
    const perdida = (tiempo * 0.5).toFixed(2);
    const tempFinal = (temp + parseFloat(perdida)).toFixed(2);

    setResultado(
      `Pérdida de temperatura: ${perdida}°C\nTemperatura final estimada: ${tempFinal}°C`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Package className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cadena de Frío
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Calcula conservación en transporte de pescado
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCalcular} className="space-y-4">
          <Input
            label="Temperatura Inicial (°C)"
            type="number"
            placeholder="-5"
            value={temperaturaInicial}
            onChange={(e) => setTemperaturaInicial(e.target.value)}
            step="0.1"
          />

          <Input
            label="Tiempo de Transporte (horas)"
            type="number"
            placeholder="4"
            value={tiempoTransporte}
            onChange={(e) => setTiempoTransporte(e.target.value)}
            step="0.5"
          />

          <Button type="submit" className="w-full">
            Calcular Pérdidas
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
