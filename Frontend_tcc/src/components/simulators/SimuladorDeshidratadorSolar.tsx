import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { Sun } from 'lucide-react';

export const SimuladorDeshidratadorSolar: React.FC = () => {
  const [irradiancia, setIrradiancia] = useState('');
  const [area, setArea] = useState('');
  const [resultado, setResultado] = useState<string | null>(null);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!irradiancia || !area) {
      alert('Por favor completa todos los campos');
      return;
    }

    const irrad = parseFloat(irradiancia);
    const ar = parseFloat(area);
    const potencia = (irrad * ar * 0.85) / 1000;
    const energia = (potencia * 8).toFixed(2);

    setResultado(
      `Potencia disponible: ${potencia.toFixed(2)} kW\nEnergía diaria (8h): ${energia} kWh`
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <Sun className="text-yellow-600 dark:text-yellow-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Deshidratador Solar
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Simula secado térmico solar
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCalcular} className="space-y-4">
          <Input
            label="Irradiancia Solar (W/m²)"
            type="number"
            placeholder="800"
            value={irradiancia}
            onChange={(e) => setIrradiancia(e.target.value)}
            step="10"
            min="0"
          />

          <Input
            label="Área de Captación (m²)"
            type="number"
            placeholder="10"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            step="0.5"
            min="0"
          />

          <Button type="submit" className="w-full">
            Calcular Energía Solar
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
