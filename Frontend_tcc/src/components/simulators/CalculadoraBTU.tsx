import React, { useState } from 'react';
import { Card, Input, Button, Alert } from '../common/FormComponents';
import { CalculadoraBTUParams, CalculadoraBTUResult } from '../../types/index';
import { formatBTU, formatCurrency, formatEnergy } from '../../utils/formatters';
import { Wind } from 'lucide-react';

export const CalculadoraBTU: React.FC = () => {
  const [params, setParams] = useState<CalculadoraBTUParams>({
    largo: 5,
    ancho: 4,
    altura: 2.8,
    ventanas: 2,
    personas: 3,
    equiposElectronicos: 2,
  });

  const [result, setResult] = useState<CalculadoraBTUResult | null>(null);

  const calcular = () => {
    const { largo, ancho, altura, ventanas, personas, equiposElectronicos } = params;

    const volumen = largo * ancho * altura;
    const area = largo * ancho;

    let btuBase = area * 55 + volumen * 1.5 + ventanas * 200 + personas * 600 + equiposElectronicos * 800;

    const btuRecomendado = Math.round(btuBase * 1.1);
    const capacidadMinima = Math.round(btuBase * 0.9);
    const kWRecomendado = btuRecomendado * 0.000293071;
    const consumoDiario = kWRecomendado * 8;
    const consumoMensual = Math.round(consumoDiario * 30);
    const costoMensual = Math.round(consumoMensual * 0.15 * 100) / 100;

    setResult({
      btuRecomendado,
      capacidadMinima,
      capacidadOptima: btuRecomendado,
      consumoMensual,
      costoMensual,
      recomendaciones: [
        `Seleccione un equipo con ${formatBTU(btuRecomendado)}`,
        `Consumo: ${formatEnergy(consumoMensual)} (${formatCurrency(costoMensual)}/mes)`,
        ventanas > 3 ? 'Considere cortinas reflectantes' : '',
        personas > 5 ? 'Aumente capacidad 20%' : '',
      ].filter(Boolean),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Wind className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold">Calculadora BTU para Aire Acondicionado</h2>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Largo del Cuarto (m)"
              type="number"
              min="1"
              max="20"
              step="0.5"
              value={params.largo}
              onChange={(e) => setParams({ ...params, largo: parseFloat(e.target.value) })}
            />

            <Input
              label="Ancho del Cuarto (m)"
              type="number"
              min="1"
              max="20"
              step="0.5"
              value={params.ancho}
              onChange={(e) => setParams({ ...params, ancho: parseFloat(e.target.value) })}
            />

            <Input
              label="Altura (m)"
              type="number"
              min="2"
              max="4"
              step="0.1"
              value={params.altura}
              onChange={(e) => setParams({ ...params, altura: parseFloat(e.target.value) })}
            />

            <Input
              label="Número de Ventanas"
              type="number"
              min="0"
              max="10"
              step="1"
              value={params.ventanas}
              onChange={(e) => setParams({ ...params, ventanas: parseInt(e.target.value) })}
            />

            <Input
              label="Cantidad de Personas"
              type="number"
              min="1"
              max="20"
              step="1"
              value={params.personas}
              onChange={(e) => setParams({ ...params, personas: parseInt(e.target.value) })}
            />

            <Input
              label="Equipos Electrónicos"
              type="number"
              min="0"
              max="10"
              step="1"
              value={params.equiposElectronicos}
              onChange={(e) =>
                setParams({ ...params, equiposElectronicos: parseInt(e.target.value) })
              }
            />
          </div>

          <Button onClick={calcular} className="w-full">
            Calcular BTU Recomendado
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Resultados</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">BTU Recomendado</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {formatBTU(result.btuRecomendado)}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Consumo Mensual</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatEnergy(result.consumoMensual)}
                </p>
                <p className="text-lg text-green-600 dark:text-green-400">
                  {formatCurrency(result.costoMensual)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold">Recomendaciones</h4>
              {result.recomendaciones.map((rec, idx) => (
                <Alert key={idx} type="info">
                  {rec}
                </Alert>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
