import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { TemperaturaTanqueParams, TemperaturaTanqueResult } from '../../types/index';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplet } from 'lucide-react';

export const SimuladorTemperaturaTanques: React.FC = () => {
  const [params, setParams] = useState<TemperaturaTanqueParams>({
    volumenTanque: 500,
    colorTanque: 'gris',
    temperaturaAmbiente: 32,
  });

  const [result, setResult] = useState<TemperaturaTanqueResult | null>(null);

  const calcular = () => {
    const { volumenTanque, colorTanque, temperaturaAmbiente } = params;

    const absorcion: Record<string, number> = {
      negro: 0.95,
      gris: 0.5,
      blanco: 0.25,
    };

    const alpha = absorcion[colorTanque];
    const radio = Math.cbrt((volumenTanque / 1000) / (Math.PI * 2));
    const areaSup = Math.PI * radio * radio;

    const temperaturasHorarias: number[] = [];
    let maxTemp = temperaturaAmbiente;
    let horaMaxima = 0;

    for (let hora = 0; hora < 24; hora++) {
      const radiacion = Math.sin(((hora - 6) * 15) * (Math.PI / 180)) * 800 * Math.max(0, 1);
      const radiacionEfectiva = Math.max(0, radiacion) * alpha * areaSup;
      const calorAbsorbido = radiacionEfectiva * 3600 / 4186;
      const masa = (volumenTanque / 1000) * 1000;
      const deltaT = calorAbsorbido / masa;
      const perdidasRadiacion = hora > 6 && hora < 18 ? 0.5 : 2.0;

      const tempActual =
        (temperaturasHorarias[hora - 1] ?? temperaturaAmbiente) + deltaT - perdidasRadiacion;
      const tempFinal = Math.max(temperaturaAmbiente, Math.min(tempActual, 65));

      temperaturasHorarias.push(Math.round(tempFinal * 10) / 10);

      if (tempFinal > maxTemp) {
        maxTemp = tempFinal;
        horaMaxima = hora;
      }
    }

    const conPolisombra = temperaturasHorarias.map((temp, idx) => {
      return Math.max(temperaturaAmbiente, temp - (idx > 6 && idx < 18 ? 5 : 0));
    });

    setResult({
      temperaturasHorarias,
      horaMaximaTemperatura: horaMaxima,
      temperaturaMaxima: Math.round(maxTemp * 10) / 10,
      conPolisombra,
      recomendaciones: [
        colorTanque === 'negro' ? 'Considere cambiar a color claro' : 'Color actual apropiado',
        'Instale polisombra para reducir temperatura 5-8°C',
        `Máxima temperatura: ${horaMaxima}:00h`,
        'El agua será apta entre 8-18 horas',
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Droplet className="w-8 h-8 text-cyan-500" />
        <h2 className="text-2xl font-bold">Simulador de Temperatura de Tanques de Agua</h2>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Volumen del Tanque (litros)"
              type="number"
              min="100"
              max="5000"
              step="50"
              value={params.volumenTanque}
              onChange={(e) => setParams({ ...params, volumenTanque: parseFloat(e.target.value) })}
            />

            <select
              value={params.colorTanque}
              onChange={(e) =>
                setParams({
                  ...params,
                  colorTanque: e.target.value as 'negro' | 'gris' | 'blanco',
                })
              }
              className="input"
            >
              <option value="negro">Negro</option>
              <option value="gris">Gris</option>
              <option value="blanco">Blanco</option>
            </select>

            <Input
              label="Temperatura Ambiente (°C)"
              type="number"
              min="15"
              max="50"
              step="0.5"
              value={params.temperaturaAmbiente}
              onChange={(e) =>
                setParams({ ...params, temperaturaAmbiente: parseFloat(e.target.value) })
              }
            />
          </div>

          <Button onClick={calcular} className="w-full">
            Simular Temperatura
          </Button>
        </div>
      </Card>

      {result && (
        <>
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Resultados</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Temperatura Máxima</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {result.temperaturaMaxima}°C
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hora de Máxima Temp</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {result.horaMaximaTemperatura}:00h
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {result.recomendaciones.map((rec, idx) => (
                  <Alert key={idx} type="info">
                    {rec}
                  </Alert>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Evolución de Temperatura</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={result.temperaturasHorarias.map((temp, idx) => ({
                    hora: idx,
                    'Sin Protección': temp,
                    'Con Polisombra': result.conPolisombra[idx],
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hora" label={{ value: 'Hora', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Sin Protección" stroke="#ef4444" dot={false} />
                  <Line type="monotone" dataKey="Con Polisombra" stroke="#06b6d4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
