import React, { useState } from 'react';
import { Card, Input, Select, Button, Alert, LoadingSpinner } from '../common/FormComponents';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TechoTermicoParams, TechoTermicoResult } from '../../types/index';
import { formatTemperature, formatPower } from '../../utils/formatters';
import { Thermometer } from 'lucide-react';

export const SimuladorTechoTermico: React.FC = () => {
  const [params, setParams] = useState<TechoTermicoParams>({
    temperaturaExterior: 32,
    hora: 12,
    materialTecho: 'zinc',
    alturaHabitacion: 3,
  });

  const [result, setResult] = useState<TechoTermicoResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calcular = () => {
    setIsLoading(true);

    // Simulación de cálculo (en producción sería una llamada a API)
    setTimeout(() => {
      // Fórmula simplificada del simulador
      const U: Record<string, number> = {
        zinc: 8.0,
        fibrocemento: 5.5,
        concreto: 3.5,
      };

      const factorRadiacion = Math.sin((params.hora * 15 - 90) * (Math.PI / 180)) * 500;
      const radiacionReal = Math.max(0, factorRadiacion);
      const temperaturaAumento = (radiacionReal * 0.8) / 100;

      const uValue = U[params.materialTecho];
      const deltaT = params.temperaturaExterior + temperaturaAumento - 25;
      const transferenciaCal = uValue * 20 * deltaT;

      const temperaturaInterior = Math.min(
        25 + temperaturaAumento * 0.3,
        params.temperaturaExterior - 2
      );

      setResult({
        temperaturaInterior: Math.round(temperaturaInterior * 10) / 10,
        transferenciaCal: Math.round(transferenciaCal),
        potenciaTotal: Math.round((Math.abs(transferenciaCal) / 1000) * 100) / 100,
        recomendaciones: [
          params.materialTecho === 'zinc'
            ? 'El zinc conduce mucho calor. Considere agregar aislamiento.'
            : 'Material con buena aislación',
          'Instale polisombra para mejorar',
          'Ventilación nocturna es recomendada',
        ],
      });

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Thermometer className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold">Simulador Térmico de Techos</h2>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Temperatura Exterior (°C)"
              type="number"
              min="15"
              max="50"
              step="0.5"
              value={params.temperaturaExterior}
              onChange={(e) =>
                setParams({ ...params, temperaturaExterior: parseFloat(e.target.value) })
              }
            />

            <Input
              label="Hora del Día (0-23)"
              type="number"
              min="0"
              max="23"
              step="1"
              value={params.hora}
              onChange={(e) => setParams({ ...params, hora: parseFloat(e.target.value) })}
            />

            <Select
              label="Material del Techo"
              options={[
                { value: 'zinc', label: 'Zinc' },
                { value: 'fibrocemento', label: 'Fibrocemento' },
                { value: 'concreto', label: 'Concreto' },
              ]}
              value={params.materialTecho}
              onChange={(e) =>
                setParams({
                  ...params,
                  materialTecho: e.target.value as 'zinc' | 'fibrocemento' | 'concreto',
                })
              }
            />

            <Input
              label="Altura de la Habitación (m)"
              type="number"
              min="2"
              max="5"
              step="0.5"
              value={params.alturaHabitacion}
              onChange={(e) =>
                setParams({ ...params, alturaHabitacion: parseFloat(e.target.value) })
              }
            />
          </div>

          <Button onClick={calcular} isLoading={isLoading} className="w-full">
            Calcular Temperatura
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Resultados</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Temperatura Interior</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatTemperature(result.temperaturaInterior)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Transferencia de Calor</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {result.transferenciaCal} W
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Potencia Total</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {formatPower(result.potenciaTotal * 1000)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-3">Recomendaciones</h4>
                <div className="space-y-2">
                  {result.recomendaciones.map((rec, idx) => (
                    <Alert key={idx} type="info">
                      {rec}
                    </Alert>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Evolución de Temperatura Durante el Día</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={Array.from({ length: 24 }, (_, i) => ({
                    hora: i,
                    temperatura: 20 + Math.sin((i * 15 - 90) * (Math.PI / 180)) * 8 + 5,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" label={{ value: 'Hora', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperatura"
                    stroke="#f97316"
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
