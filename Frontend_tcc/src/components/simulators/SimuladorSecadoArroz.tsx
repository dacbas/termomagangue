import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { Leaf } from 'lucide-react';

export const SimuladorSecadoArroz: React.FC = () => {
  const [humedadInicial, setHumedadInicial] = useState('');
  const [humedadFinal, setHumedadFinal] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!humedadInicial || !humedadFinal) {
      alert('Por favor completa todos los campos');
      return;
    }

    const hInicial = parseFloat(humedadInicial);
    const hFinal = parseFloat(humedadFinal);
    const tiempo = ((hInicial - hFinal) / hInicial) * 100;

    setResultado(`Tiempo estimado de secado: ${tiempo.toFixed(2)} horas`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <Leaf className="text-yellow-600 dark:text-yellow-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Secado de Arroz
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Optimiza energía para secado agroindustrial
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCalcular} className="space-y-4">
          <Input
            label="Humedad Inicial (%)"
            type="number"
            placeholder="25"
            value={humedadInicial}
            onChange={(e) => setHumedadInicial(e.target.value)}
            step="0.1"
          />

          <Input
            label="Humedad Final Deseada (%)"
            type="number"
            placeholder="14"
            value={humedadFinal}
            onChange={(e) => setHumedadFinal(e.target.value)}
            step="0.1"
          />

          <Button type="submit" className="w-full">
            Calcular Tiempo de Secado
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
