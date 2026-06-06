# 🌡️ TermoMagangué - Simuladores Termodinámicos

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org)

Plataforma web moderna de simuladores termodinámicos y de física para resolver problemas reales en Magangué, Bolívar, Colombia. Desarrollada para estudiantes de Ingeniería de Software, docentes y habitantes de la región.

## 🎯 Características Principales

- **10 Simuladores Especializados**: Térmicos, energéticos, acuícolas y agroindustriales
- **Autenticación JWT**: Sistema seguro de registro e inicio de sesión
- **Dashboard Interactivo**: Interfaz intuitiva y responsive
- **Gráficos Dinámicos**: Visualización de resultados con Recharts y Chart.js
- **Historial de Simulaciones**: Guarda todas tus simulaciones
- **Exportación de Reportes**: PDF y Excel
- **Modo Oscuro**: Interfaz adaptada a preferencias
- **API REST Documentada**: Swagger/OpenAPI

## 🚀 Simuladores Disponibles

1. **Simulador Térmico de Techos** - Análisis de transferencia de calor en diferentes materiales
2. **Calculadora BTU** - Capacidad necesaria de aire acondicionado
3. **Consumo de Nevera** - Estimación de consumo energético
4. **Temperatura de Tanques de Agua** - Evolución térmica durante el día
5. **Ventilación Nocturna** - Cálculo de enfriamiento natural
6. **Simulador Acuícola** - Monitoreo de estanques de peces
7. **Optimizador de Secado de Arroz** - Energía para secado agroindustrial
8. **Cadena de Frío** - Conservación en transporte de productos
9. **Deshidratador Solar** - Simulación térmica solar
10. **Enfriamiento de Leche** - Sistemas de refrigeración para lácteos

## 💻 Stack Tecnológico

### Frontend
- **React 18** + TypeScript
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos utility-first
- **Recharts** - Gráficos interactivos
- **Zustand** - State management
- **React Router** - Enrutamiento
- **Axios** - HTTP client

### Backend
- **Node.js** + Express.js
- **TypeScript** - Type safety
- **MySQL 2** - Base de datos
- **JWT** - Autenticación
- **Bcryptjs** - Hash de contraseñas
- **Helmet** - Seguridad HTTP
- **Swagger/JSDoc** - Documentación API

### DevOps
- **Docker** (Opcional)
- **ESLint + Prettier** - Linting
- **Jest** - Testing

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- MySQL 8 o superior
- Git

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/termomagangue.git
cd termomagangue
```

### 2. Configurar Backend

```bash
cd backend_tcc

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con tus valores
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=tu_contraseña
# DB_NAME=termomagangue
# JWT_SECRET=tu_clave_super_segura

# Compilar TypeScript
npm run build

# Iniciar servidor
npm run dev
```

El backend estará disponible en `http://localhost:5000`
Documentación API: `http://localhost:5000/api-docs`

### 3. Configurar Frontend

```bash
cd ../Frontend_tcc

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### 4. Configurar Base de Datos

```bash
# Conectarse a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE IF NOT EXISTS termomagangue;
USE termomagangue;

# Las tablas se crearán automáticamente al iniciar el backend
```

## 📚 Documentación API

Accede a la documentación interactiva en:
```
http://localhost:5000/api-docs
```

### Endpoints Principales

#### Autenticación
- `POST /api/auth/registro` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

#### Usuario
- `GET /api/usuarios/me` - Obtener perfil (requiere token)
- `GET /api/usuarios` - Listar usuarios (admin)

#### Simulaciones
- `POST /api/simulaciones` - Crear simulación
- `GET /api/simulaciones/:id` - Obtener simulación
- `GET /api/simulaciones` - Listar simulaciones

## 🧮 Fórmulas Termodinámicas Implementadas

### Transferencia de Calor (Ley de Fourier)
```
Q = U × A × ΔT
Donde:
- Q: Transferencia de calor (W)
- U: Coeficiente de transmitancia térmica (W/m²·K)
- A: Área de transferencia (m²)
- ΔT: Diferencia de temperatura (K)
```

### Cálculo de BTU
```
BTU = (Área × 50-60) + (Volumen × 1.5) + (Ventanas × 200) + (Personas × 600) + (Equipos × 800)
```

### Capacidad Térmica
```
Q = m × Cp × ΔT
Donde:
- m: Masa (kg)
- Cp: Capacidad calorífica específica (J/kg·K)
- ΔT: Cambio de temperatura (K)
```

## 📊 Estructura de Carpetas

```
termomagangue/
├── backend_tcc/
│   ├── src/
│   │   ├── config/          # Configuraciones
│   │   ├── database/        # Conexión y inicialización
│   │   ├── models/          # Modelos de datos
│   │   ├── routes/          # Rutas API
│   │   ├── controllers/     # Lógica de controladores
│   │   ├── middleware/      # Middlewares (auth, etc)
│   │   ├── services/        # Servicios reutilizables
│   │   ├── types/           # Tipos TypeScript
│   │   └── utils/           # Utilidades y fórmulas
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── Frontend_tcc/
    ├── src/
    │   ├── components/
    │   │   ├── common/      # Componentes reutilizables
    │   │   └── simulators/  # Componentes de simuladores
    │   ├── pages/           # Páginas principales
    │   ├── services/        # Servicios de API
    │   ├── store/           # Zustand stores
    │   ├── hooks/           # Custom hooks
    │   ├── types/           # Tipos TypeScript
    │   ├── utils/           # Utilidades
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## 🛠️ Desarrollo

### Backend
```bash
cd backend_tcc

# Iniciar en modo desarrollo (auto-reload)
npm run dev

# Compilar
npm run build

# Ejecutar linting
npm run lint

# Ejecutar tests
npm run test
```

### Frontend
```bash
cd Frontend_tcc

# Iniciar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de build
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🔐 Seguridad

- ✅ Autenticación con JWT
- ✅ Contraseñas hasheadas con bcryptjs (10 rondas)
- ✅ CORS configurado
- ✅ Helmet para headers HTTP
- ✅ Validación de entrada
- ✅ Rate limiting (recomendado en producción)

## 📝 Variables de Entorno

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=termomagangue
DB_PORT=3306
JWT_SECRET=tu_super_secreto_cambiar_en_produccion
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend
cd backend_tcc
npm run test

# Frontend
cd Frontend_tcc
npm run test
```

## 📦 Compilación para Producción

### Backend
```bash
cd backend_tcc
npm install
npm run build
npm start
```

### Frontend
```bash
cd Frontend_tcc
npm install
npm run build
# Servir dist/ con tu servidor web preferido (nginx, apache, etc)
```

## 🐳 Docker (Opcional)

```bash
# Construir imagen
docker build -t termomagangue .

# Ejecutar contenedor
docker run -p 5000:5000 -p 3000:3000 termomagangue
```

## 📱 Responsive Design

- ✅ Mobile First
- ✅ Tablet optimizado
- ✅ Desktop completo
- ✅ Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

## 🌙 Modo Oscuro

- Disponible en todas las páginas
- Preferencia guardada en localStorage
- Transiciones suaves

## 📊 Analytics y Monitoreo

Recomendado para producción:
- Google Analytics
- Sentry para error tracking
- LogRocket para session replay

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👥 Autor

**TermoMagangué Team**
- Email: info@thermomagangue.com
- Ubicación: Magangué, Bolívar, Colombia

## 🙏 Agradecimientos

- Universidad de Cartagena - Programa de Ingeniería de Software
- Comunidad de Magangué
- Contribuidores y colaboradores

## 📞 Soporte

Para reportar bugs o sugerencias:
- GitHub Issues: [Issues](https://github.com/termomagangue/issues)
- Email: support@thermomagangue.com

---

**¡Hecho con ❤️ para Magangué, Bolívar!**

Última actualización: 2024
