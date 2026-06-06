export const formatTemperature = (temp: number, decimals: number = 1): string => {
  return `${temp.toFixed(decimals)}°C`;
};

export const formatPower = (power: number): string => {
  if (power >= 1000) {
    return `${(power / 1000).toFixed(2)} kW`;
  }
  return `${power.toFixed(0)} W`;
};

export const formatEnergy = (energy: number): string => {
  return `${energy.toFixed(2)} kWh`;
};

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return `${currency} ${value.toFixed(2)}`;
};

export const formatBTU = (btu: number): string => {
  return `${btu.toLocaleString()} BTU/h`;
};

export const getColorForTemperature = (temp: number): string => {
  if (temp < 10) return 'text-blue-600 dark:text-blue-400';
  if (temp < 20) return 'text-cyan-600 dark:text-cyan-400';
  if (temp < 28) return 'text-green-600 dark:text-green-400';
  if (temp < 35) return 'text-yellow-600 dark:text-yellow-400';
  if (temp < 40) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
};

export const getBgColorForTemperature = (temp: number): string => {
  if (temp < 10) return 'bg-blue-100 dark:bg-blue-900';
  if (temp < 20) return 'bg-cyan-100 dark:bg-cyan-900';
  if (temp < 28) return 'bg-green-100 dark:bg-green-900';
  if (temp < 35) return 'bg-yellow-100 dark:bg-yellow-900';
  if (temp < 40) return 'bg-orange-100 dark:bg-orange-900';
  return 'bg-red-100 dark:bg-red-900';
};
