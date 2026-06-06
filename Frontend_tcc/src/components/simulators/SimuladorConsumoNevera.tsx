import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { Refrigerator } from 'lucide-react';

export const SimuladorConsumoNevera: React.FC = () => {
  const [potencia, setPotencia] = useState('');
  const [horasDia, setHorasDia] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!potencia || !horasDia) {
      alert('Por favor completa todos los campos');
      return;
    }

    const pot = parseFloat(potencia);
    const horas = parseFloat(horasDia);
    const consumoDiario = (pot * horas) / 1000;
    const consumoMensual = consumoDiario * 30;

    setResultado(
      `Consumo diario: ${consumoDiario.toFixed(2)} kWh\nConsumo mensual: ${consumoMensual.toFixed(2)} kWh`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
            <Refrigerator className="text-cyan-600 dark:text-cyan-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Consumo de Nevera
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Estima el consumo energético y pérdidas de frío
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCalcular} className="space-y-4">
          <Input
            label="Potencia de Compresor (W)"
            type="number"
            placeholder="500"
            value={potencia}
            onChange={(e) => setPotencia(e.target.value)}
            step="10"
          />

          <Input
            label="Horas de Funcionamiento por Día"
            type="number"
            placeholder="8"
            value={horasDia}
            onChange={(e) => setHorasDia(e.target.value)}
            step="0.5"
            min="0"
            max="24"
          />

          <Button type="submit" className="w-full">
            Calcular Consumo
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
