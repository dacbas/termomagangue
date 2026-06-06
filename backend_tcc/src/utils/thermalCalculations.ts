/**
 * Fórmulas Termodinámicas y de Física para TermoMagangué
 * Basadas en principios de transferencia de calor, termodinámica e ingeniería
 */

// ===================== SIMULADOR TÉRMICO DE TECHOS =====================
export interface TechoTermicoParams {
  temperaturaExterior: number; // °C
  hora: number; // 0-23
  materialTecho: 'zinc' | 'fibrocemento' | 'concreto';
  alturaHabitacion: number; // metros
  areaTecho?: number; // m²
}

export interface TechoTermicoResult {
  temperaturaInterior: number;
  transferenciaCal: number; // W
  potenciaTotal: number; // kW
  recomendaciones: string[];
}

export function calcularTechoTermico(params: TechoTermicoParams): TechoTermicoResult {
  const { temperaturaExterior, hora, materialTecho, alturaHabitacion, areaTecho = 20 } = params;

  // Coeficientes de transmitancia térmica (U-value) W/(m²·K) para materiales
  const coeficientesU: Record<string, number> = {
    zinc: 8.0, // Alto, mala aislación
    fibrocemento: 5.5,
    concreto: 3.5, // Mejor aislación
  };

  const factorRadiacion = Math.sin((hora * 15 - 90) * (Math.PI / 180)) * 500; // Radiación solar en W/m²
  const radiacionReal = Math.max(0, factorRadiacion);
  const temperaturaAumento = (radiacionReal * 0.8) / 100; // Factor de absorción ~0.8

  const U = coeficientesU[materialTecho];
  const deltaT = temperaturaExterior + temperaturaAumento - 25; // 25°C interior deseado
  const transferenciaCal = U * areaTecho * deltaT; // Q = U*A*ΔT [W]

  // Modelo de temperatura interior considerando capacidad térmica
  const capacidadTermica = alturaHabitacion * areaTecho * 1200; // J/K (aire y materiales)
  const cambioTemperatura = transferenciaCal / (capacidadTermica / 3600); // °C/hora

  const temperaturaInterior = Math.min(
    25 + cambioTemperatura * 0.3,
    temperaturaExterior - 2
  );

  const potenciaTotal = Math.abs(transferenciaCal) / 1000; // kW

  const recomendaciones: string[] = [];
  if (materialTecho === 'zinc') {
    recomendaciones.push(
      'El zinc conduce mucho calor. Considere agregar aislamiento térmico como poliestireno.'
    );
    recomendaciones.push(
      'Instale una cámara de aire bajo el zinc para mejorar aislación térmica.'
    );
  } else if (materialTecho === 'concreto') {
    recomendaciones.push('El concreto tiene buena aislación térmica, pero acumula calor.');
    recomendaciones.push('Use colores claros en la superficie para aumentar reflectancia.');
  }

  if (temperaturaInterior > 30) {
    recomendaciones.push(
      'La temperatura interior superará 30°C. Se recomienda ventilación nocturna o aire acondicionado.'
    );
  }

  return {
    temperaturaInterior: Math.round(temperaturaInterior * 10) / 10,
    transferenciaCal: Math.round(transferenciaCal),
    potenciaTotal: Math.round(potenciaTotal * 100) / 100,
    recomendaciones,
  };
}

// ===================== CALCULADORA BTU =====================
export interface CalculadoraBTUParams {
  largo: number; // metros
  ancho: number; // metros
  altura: number; // metros
  ventanas: number;
  personas: number;
  equiposElectronicos: number;
}

export interface CalculadoraBTUResult {
  btuRecomendado: number;
  capacidadMinima: number;
  capacidadOptima: number;
  consumoMensual: number; // kWh
  costoMensual: number; // USD
  recomendaciones: string[];
}

export function calcularBTU(params: CalculadoraBTUParams): CalculadoraBTUResult {
  const { largo, ancho, altura, ventanas, personas, equiposElectronicos } = params;

  const volumen = largo * ancho * altura; // m³
  const area = largo * ancho; // m²

  // Cálculo de BTU base: 50-60 BTU/m² en clima tropical
  let btuBase = area * 55; // BTU/hora

  // Factor por volumen: 1.5 BTU/m³
  btuBase += volumen * 1.5;

  // Carga por ventanas (200 BTU por ventana expuesta al sol)
  btuBase += ventanas * 200;

  // Carga por personas (600 BTU por persona)
  btuBase += personas * 600;

  // Carga por equipos electrónicos (800 BTU por equipo)
  btuBase += equiposElectronicos * 800;

  // Factor de seguridad 1.1 para márgenes
  const btuRecomendado = Math.round(btuBase * 1.1);
  const capacidadMinima = Math.round(btuBase * 0.9);
  const capacidadOptima = btuRecomendado;

  // Conversión BTU a kW: 1 BTU/h ≈ 0.000293071 kW
  const kWRecomendado = btuRecomendado * 0.000293071;

  // Consumo considerando 8 horas diarias de funcionamiento
  const consumoDiario = kWRecomendado * 8; // kWh/día
  const consumoMensual = Math.round(consumoDiario * 30);

  // Costo aproximado: 0.15 USD/kWh (tarifa promedio Latinoamérica)
  const costoMensual = Math.round(consumoMensual * 0.15 * 100) / 100;

  const recomendaciones: string[] = [];
  recomendaciones.push(
    `Seleccione un equipo con capacidad de ${btuRecomendado.toLocaleString()} BTU/h`
  );
  recomendaciones.push(
    `Consumo estimado: ${consumoMensual} kWh/mes (${costoMensual} USD/mes)`
  );

  if (ventanas > 3) {
    recomendaciones.push(
      'Instale cortinas o persianas reflectantes para reducir ganancia solar.'
    );
  }

  if (personas > 5) {
    recomendaciones.push(
      'Con muchas personas, considere aumentar la capacidad del equipo un 20%.'
    );
  }

  return {
    btuRecomendado,
    capacidadMinima,
    capacidadOptima,
    consumoMensual,
    costoMensual,
    recomendaciones,
  };
}

// ===================== CONSUMO DE NEVERA =====================
export interface ConsumoNeveraParams {
  temperaturaAmbiente: number; // °C
  volumenNevera: number; // litros
  aperturasDialas: number;
  tiempoAbiertaPromedio: number; // minutos
}

export interface ConsumoNeveraResult {
  energiaPerdida: number; // kWh
  consumoAdicional: number; // kWh
  costoMensual: number; // USD
  consejos: string[];
}

export function calcularConsumoNevera(params: ConsumoNeveraParams): ConsumoNeveraResult {
  const { temperaturaAmbiente, volumenNevera, aperturasDialas, tiempoAbiertaPromedio } = params;

  // Capacidad térmica del aire: 1.2 J/L·K
  // Diferencia de temperatura: T_interior (4°C) - T_ambiente
  const deltaTempEfectiva = temperaturaAmbiente - 4;

  // Energía perdida por apertura: 0.5 * ρ * V * Cp * ΔT * t_abierto
  const energiaPorApertura = (0.5 * 1.2 * volumenNevera * deltaTempEfectiva * tiempoAbiertaPromedio) / 3600000; // kWh
  const energiaPerdidaDiaria = energiaPorApertura * aperturasDialas;
  const energiaPerdida = Math.round(energiaPerdidaDiaria * 30 * 100) / 100;

  // Consumo adicional: 20% de lo que compensa el compresor
  const consumoAdicional = Math.round(energiaPerdida * 0.2 * 100) / 100;

  // Costo: 0.15 USD/kWh
  const costoMensual = Math.round((energiaPerdida + consumoAdicional) * 0.15 * 100) / 100;

  const consejos = [
    'Evite abrir la nevera innecesariamente',
    'Mantenga la nevera en lugares frescos, alejada de fuentes de calor',
    'Verifique los sellos de la puerta regularmente',
    `Ahorro potencial: ${Math.round((costoMensual * 0.3) * 100) / 100} USD/mes optimizando uso`,
    'Considere usar hielo seco para mantener temperatura durante apagones',
  ];

  return {
    energiaPerdida,
    consumoAdicional,
    costoMensual,
    consejos,
  };
}

// ===================== TEMPERATURA DE TANQUES DE AGUA =====================
export interface TemperaturaTanqueParams {
  volumenTanque: number; // litros
  colorTanque: 'negro' | 'gris' | 'blanco';
  temperaturaAmbiente: number; // °C
  horaInicio?: number; // 0-23
}

export interface TemperaturaTanqueResult {
  temperaturasHorarias: number[];
  horaMaximaTemperatura: number;
  temperaturaMaxima: number;
  conPolisombra: number[];
  recomendaciones: string[];
}

export function calcularTemperaturaTanque(params: TemperaturaTanqueParams): TemperaturaTanqueResult {
  const { volumenTanque, colorTanque, temperaturaAmbiente, horaInicio = 6 } = params;

  // Coeficientes de absorción solar por color
  const absorcion: Record<string, number> = {
    negro: 0.95,
    gris: 0.5,
    blanco: 0.25,
  };

  const alpha = absorcion[colorTanque];
  const temperaturaInicial = temperaturaAmbiente;

  // Área del tanque (aproximación: cilindro)
  const radio = Math.cbrt((volumenTanque / 1000) / (Math.PI * 2)); // metros
  const areaSup = Math.PI * radio * radio; // m² (superficie superior)

  const temperaturasHorarias: number[] = [];
  let maxTemp = temperaturaInicial;
  let horaMaxima = horaInicio;

  // Simulación de 24 horas
  for (let hora = 0; hora < 24; hora++) {
    // Radiación solar máxima ~800 W/m² entre 10-14h
    const radiacion = Math.sin(((hora - 6) * 15) * (Math.PI / 180)) * 800 * Math.max(0, 1);
    const radiacionEfectiva = Math.max(0, radiacion) * alpha * areaSup; // W

    // Calor absorbido en 1 hora
    const calorAbsorbido = radiacionEfectiva * 3600 / 4186; // kcal (1 cal = 4.186 J)

    // Cambio de temperatura: Q = m*Cp*ΔT
    // Densidad agua ~1000 kg/m³, Cp = 1 kcal/kg·K
    const masa = (volumenTanque / 1000) * 1000; // kg
    const deltaT = calorAbsorbido / masa; // °C/hora

    // Pérdida por radiación (Stefan-Boltzmann simplificado)
    const perdidasRadiacion = (hora > 6 && hora < 18) ? 0.5 : 2.0; // °C/hora

    const tempActual =
      (temperaturasHorarias[hora - 1] ?? temperaturaInicial) + deltaT - perdidasRadiacion;

    const tempFinal = Math.max(temperaturaAmbiente, Math.min(tempActual, 65)); // Límite máximo 65°C
    temperaturasHorarias.push(Math.round(tempFinal * 10) / 10);

    if (tempFinal > maxTemp) {
      maxTemp = tempFinal;
      horaMaxima = hora;
    }
  }

  // Simulación con polisombra (reduce 40% de radiación)
  const conPolisombra = temperaturasHorarias.map((temp, idx) => {
    return Math.max(temperaturaAmbiente, temp - (idx > 6 && idx < 18 ? 5 : 0));
  });

  const recomendaciones = [
    colorTanque === 'negro'
      ? 'Tanque negro absorbe mucho calor. Considere cambiar a color claro.'
      : 'Color actual apropiado para la región.',
    'Instale polisombra para reducir temperatura 5-8°C',
    `Hora de máxima temperatura: ${horaMaxima}:00 horas (${maxTemp.toFixed(1)}°C)`,
    'El agua estará apta para consumo entre 8-18 horas aproximadamente',
  ];

  return {
    temperaturasHorarias,
    horaMaximaTemperatura: horaMaxima,
    temperaturaMaxima: Math.round(maxTemp * 10) / 10,
    conPolisombra,
    recomendaciones,
  };
}

// ===================== CALCULADORA ACUÍCOLA =====================
export interface AcuicolaParams {
  volumenEstanque: number; // m³
  temperaturaAmbiente: number; // °C
  velocidadViento: number; // m/s
  radiacionSolar: number; // W/m²
}

export interface AcuicolaResult {
  temperaturaFutura: number;
  nivelOxigeno: number;
  alertas: string[];
  recomendaciones: string[];
}

export function calcularAcuicola(params: AcuicolaParams): AcuicolaResult {
  const { volumenEstanque, temperaturaAmbiente, velocidadViento, radiacionSolar } = params;

  // Área del espejo de agua (aproximación)
  const areaEstanque = Math.sqrt(volumenEstanque) * 2; // m²

  // Ganancia de calor por radiación
  const calorRadiacion = radiacionSolar * areaEstanque * 0.7; // 70% absorbida

  // Pérdida por evaporación: ~0.1 kg/(m²·hora) en clima cálido
  const evaporacionMasa = 0.1 * areaEstanque; // kg/hora
  const calorEvaporacion = evaporacionMasa * 2450 * 1000; // J/hora (calor latente)

  // Pérdida por radiación térmica
  const calorRadiacionTermica = 50 * areaEstanque; // W (aproximación)

  // Intercambio por viento (h = 5.8 * v^0.8, donde v es velocidad en m/s)
  const hConvectivo = 5.8 * Math.pow(velocidadViento + 0.1, 0.8);
  const deltaT = temperaturaAmbiente - 28; // Diferencia con agua a 28°C
  const calorConvectivo = hConvectivo * areaEstanque * deltaT * 3600; // J/hora

  // Balance energético
  const calorNeto = (calorRadiacion + calorConvectivo - calorEvaporacion - calorRadiacionTermica * 3600) / 1000; // kJ
  const deltaTemp = calorNeto / (volumenEstanque * 1000 * 4.186); // °C

  const temperaturaFutura = Math.round((temperaturaAmbiente + deltaTemp) * 10) / 10;

  // Cálculo de oxígeno disuelto simplificado (mg/L)
  // A mayor temperatura, menor solubilidad
  let nivelOxigeno = 8; // Teórico máximo a 25°C
  nivelOxigeno -= (temperaturaFutura - 25) * 0.3; // Reduce 0.3 mg/L por °C
  nivelOxigeno = Math.max(0, nivelOxigeno);

  const alertas: string[] = [];
  if (temperaturaFutura > 32) {
    alertas.push('🔴 ALERTA: Temperatura crítica (> 32°C). Aumentar aireación.');
  } else if (temperaturaFutura > 30) {
    alertas.push('🟡 PRECAUCIÓN: Temperatura alta (30-32°C). Monitorear oxígeno.');
  }

  if (nivelOxigeno < 3) {
    alertas.push('🔴 ALERTA: Oxígeno disuelto crítico (< 3 mg/L).');
  } else if (nivelOxigeno < 5) {
    alertas.push('🟡 PRECAUCIÓN: Oxígeno bajo. Considere aireación.');
  }

  const recomendaciones = [
    'Realice cambios parciales de agua en tardes calurosas',
    'Instale aireadores mecánicos o fuentes de aire',
    `Temperatura esperada: ${temperaturaFutura}°C, Oxígeno: ${nivelOxigeno.toFixed(1)} mg/L`,
    'Alimente a los peces en horas tempranas (menor temperatura)',
    'Proteja el estanque del sol directo si es posible',
  ];

  return {
    temperaturaFutura,
    nivelOxigeno: Math.round(nivelOxigeno * 10) / 10,
    alertas,
    recomendaciones,
  };
}

// ===================== ENFRIAMIENTO DE LECHE =====================
export interface EnfriamientoLecheParams {
  volumenLeche: number; // litros
  temperaturaInicial: number; // °C
  temperaturaDeseada: number; // °C
  metodoEnfriamiento: 'ventilador' | 'hielo' | 'refrigerante';
}

export interface EnfriamientoLecheResult {
  potenciaRequerida: number; // kW
  tiempoEnfriamiento: number; // minutos
  costoOperacion: number; // USD
  equipoRecomendado: string;
  recomendaciones: string[];
}

export function calcularEnfriamientoLeche(params: EnfriamientoLecheParams): EnfriamientoLecheResult {
  const { volumenLeche, temperaturaInicial, temperaturaDeseada, metodoEnfriamiento } = params;

  // Capacidad térmica de la leche ~3.9 kJ/kg·K
  const masaLeche = volumenLeche * 1.03; // kg (densidad leche ~1.03)
  const calprEspecifico = 3.9; // kJ/kg·K
  const deltaT = temperaturaInicial - temperaturaDeseada;

  // Energía a remover: Q = m * Cp * ΔT
  const energiaRemover = masaLeche * calprEspecifico * deltaT; // kJ

  // Coeficientes de eficiencia por método
  const eficiencia: Record<string, number> = {
    ventilador: 0.6, // 60% de eficiencia
    hielo: 0.85, // 85% de eficiencia
    refrigerante: 0.95, // 95% de eficiencia
  };

  const eff = eficiencia[metodoEnfriamiento];
  const potenciaRequerida = Math.round((energiaRemover / (3600 * eff)) * 100) / 100; // kW

  // Tiempo de enfriamiento considerando transferencia térmica
  const tiempoBase = (energiaRemover * 1000) / (potenciaRequerida * 3600 * 1000); // horas
  const tiempoEnfriamiento = Math.round(tiempoBase * 60); // minutos

  // Costo de operación
  const costoOperacion = Math.round((potenciaRequerida * tiempoBase * 0.15) * 100) / 100; // USD

  let equipoRecomendado = '';
  if (metodoEnfriamiento === 'ventilador') {
    equipoRecomendado = `Ventilador de ${Math.round(potenciaRequerida * 1.5)} W`;
  } else if (metodoEnfriamiento === 'hielo') {
    const hieloRequerido = Math.round((energiaRemover / 334) * 10) / 10; // kg (calor latente hielo 334 kJ/kg)
    equipoRecomendado = `${hieloRequerido} kg de hielo seco`;
  } else {
    equipoRecomendado = `Equipo refrigerante de ${Math.round(potenciaRequerida)} kW`;
  }

  const recomendaciones = [
    equipoRecomendado,
    `Tiempo aproximado: ${tiempoEnfriamiento} minutos`,
    `Costo de operación: ${costoOperacion} USD`,
    'Enfriar leche rápidamente previene proliferación bacteriana',
    'Mantenga temperatura ≤ 4°C para conservación óptima',
  ];

  return {
    potenciaRequerida,
    tiempoEnfriamiento,
    costoOperacion,
    equipoRecomendado,
    recomendaciones,
  };
}

// Exportar todas las funciones
export const ThermalCalculations = {
  calcularTechoTermico,
  calcularBTU,
  calcularConsumoNevera,
  calcularTemperaturaTanque,
  calcularAcuicola,
  calcularEnfriamientoLeche,
};
