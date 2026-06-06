# Documentación Técnica - TermoMagangué

## Descripción General
Plataforma de simuladores termodinámicos y de física para resolver problemas reales en Magangué, Bolívar. Contiene 10 simuladores con cálculos basados en principios de termodinámica, transferencia de calor y energética.

---

## Fórmulas de Física Utilizadas

### 1. **Simulador Térmico de Techos**
Calcula transferencia de calor a través de materiales de cubierta.

**Fórmulas:**
- Radiación Solar: `Q_rad = sin((hora × 15 - 90) × π/180) × 500 W/m²`
- Coeficiente U (transmitancia térmica):
  - Zinc: 8.0 W/m²K
  - Fibrocemento: 5.5 W/m²K
  - Concreto: 3.5 W/m²K
- Transferencia de calor: `Q = U × A × ΔT` (W)
- Temperatura interior: `T_int = 25 + Q_rad × 0.3`

---

### 2. **Calculadora BTU**
Determina capacidad necesaria de aire acondicionado.

**Fórmulas:**
- BTU Base: `BTU = (Área × 55) + (Volumen × 1.5) + (Ventanas × 200) + (Personas × 600) + (Equipos × 800)`
- BTU Recomendado: `BTU_rec = BTU_base × 1.1` (10% adicional para seguridad)
- Conversión a kW: `kW = BTU × 0.000293071`
- Consumo mensual: `Consumo = kW × 8h × 30 días`

---

### 3. **Simulador de Temperatura en Tanques**
Evolución térmica de tanques de agua expuestos al sol.

**Fórmulas:**
- Coeficiente de absorción (α):
  - Negro: 0.95
  - Gris: 0.50
  - Blanco: 0.25
- Radiación efectiva: `Q_ef = Radiación × α × A_sup` (W)
- Cambio de temperatura: `ΔT = Q_ef × 3600 / (m × c_p)`
  - c_p (agua) = 4186 J/kg·K
  - m = volumen × densidad
- Temperatura horaria: `T(h) = T(h-1) + ΔT - Pérdidas_radiación`

---

### 4. **Ventilación Nocturna**
Calcula enfriamiento por ventilación natural.

**Fórmula:**
- Enfriamiento: `Q_enf = T_exterior × (Humedad/100) × 0.85°C`

---

### 5. **Simulador Acuícola**
Monitorea oxígeno disponible en estanques de peces.

**Fórmula:**
- Oxígeno disponible: `O₂ = Volumen × Profundidad × 0.21 m³`
- (0.21 = concentración de O₂ en aire)

---

### 6. **Secado de Arroz**
Optimiza tiempo de secado agroindustrial.

**Fórmula:**
- Tiempo de secado: `t = (Humedad_inicial - Humedad_final) / Humedad_inicial × 100 horas`

---

### 7. **Consumo de Nevera**
Estima consumo energético diario.

**Fórmulas:**
- Consumo diario: `E_diaria = (Potencia × Horas) / 1000 kWh`
- Consumo mensual: `E_mensual = E_diaria × 30`

---

### 8. **Cadena de Frío**
Calcula pérdidas de temperatura en transporte.

**Fórmula:**
- Pérdida de temperatura: `ΔT = Tiempo_transporte × 0.5°C/hora`
- Temperatura final: `T_final = T_inicial + Pérdida`

---

### 9. **Deshidratador Solar**
Calcula energía disponible de captación solar.

**Fórmulas:**
- Potencia disponible: `P = (Irradiancia × Área × 0.85) / 1000 kW`
- (0.85 = eficiencia del sistema)
- Energía diaria (8h): `E = P × 8 kWh`

---

### 10. **Enfriamiento de Leche**
Sistemas de refrigeración para lácteos.

**Fórmulas:**
- Calor a extraer: `Q = m × c_p × ΔT`
  - m = volumen × 1.03 (densidad leche)
  - c_p = 4.18 kJ/kg·K
  - ΔT = T_inicial - 4°C
- Potencia necesaria: `P = Q / 3600 kW`
- Tiempo: `t = Q / (P × 3600) horas`

---

## Arquitectura del Proyecto

### Backend (Node.js + Express + TypeScript)
- Base de datos simulada en memoria (sin MySQL)
- Autenticación con JWT
- Rutas protegidas por usuario
- Endpoints para registro, login y simulaciones

### Frontend (React + Vite + TypeScript)
- 10 simuladores interactivos
- Gráficos con Recharts
- Almacenamiento con Zustand
- Estilos con Tailwind CSS

### Puertos
- **Backend**: 5000
- **Frontend**: 3001

---

## Características Principales
✅ Cálculos de termodinámica e ingeniería  
✅ Autenticación segura con JWT  
✅ Historial de simulaciones  
✅ Gráficos interactivos  
✅ Interfaz responsive  
✅ Modo oscuro  

---

## Estado Actual
- ✅ Backend levantado y funcionando
- ✅ Frontend en ejecución
- ✅ 10 simuladores implementados
- ✅ Autenticación completada
- 🔄 Base de datos real (pendiente MySQL)
