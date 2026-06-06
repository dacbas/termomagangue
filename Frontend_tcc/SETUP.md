# TermoMagangué Frontend - Guía de Instalación

## Requisitos

- Node.js 18+
- npm o yarn
- Backend ejecutándose en http://localhost:5000

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## Comandos Disponibles

```bash
npm run dev         # Iniciar servidor de desarrollo
npm run build       # Compilar para producción
npm run preview     # Vista previa del build
npm run lint        # Ejecutar ESLint
npm run type-check  # Verificar tipos TypeScript
```

## Estructura de Carpetas

```
src/
├── components/
│   ├── common/          # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   └── FormComponents.tsx
│   └── simulators/      # Componentes de simuladores
│       ├── SimuladorTechoTermico.tsx
│       ├── CalculadoraBTU.tsx
│       └── SimuladorTemperaturaTanques.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── RegistroPage.tsx
│   └── SimuladoresPage.tsx
├── services/
│   └── api.ts           # Cliente HTTP
├── store/
│   └── authStore.ts     # Zustand store
├── hooks/
│   └── useAuth.ts       # Custom hook
├── types/
│   └── index.ts         # Tipos TypeScript
├── utils/
│   └── formatters.ts    # Funciones de formato
├── App.tsx              # App principal
├── main.tsx             # Entry point
└── index.css            # Estilos globales
```

## Variables de Entorno

Crear archivo `.env` (opcional, ya tiene valores por defecto):

```env
VITE_API_URL=http://localhost:5000/api
```

## Características Implementadas

✅ Autenticación (Login/Registro)
✅ Dashboard con grid de simuladores
✅ 3 Simuladores principales:
   - Térmico de Techos
   - Calculadora BTU
   - Temperatura de Tanques
✅ Gráficos interactivos (Recharts)
✅ Modo oscuro
✅ Responsive design
✅ Navbar y Footer
✅ Type-safe con TypeScript

## Componentes Reutilizables

### FormComponents.tsx
- `Card` - Componente contenedor
- `Input` - Campo de entrada
- `Select` - Dropdown
- `Button` - Botón con estados
- `Alert` - Alertas/Notificaciones
- `LoadingSpinner` - Spinner de carga

### Navbar.tsx
- Navegación principal
- Toggle dark mode
- Menú móvil
- Botones de auth

### Footer.tsx
- Enlaces rápidos
- Información de contacto

## Páginas

### DashboardPage
- Hero section
- Grid de simuladores (10)
- Características destacadas
- CTA buttons

### LoginPage
- Formulario de login
- Validación
- Error handling
- Link a registro

### RegistroPage
- Formulario de registro
- Selección de rol (estudiante/docente/habitante)
- Validación de contraseña
- Error/Success messages

## Servicios

### api.ts (APIService)
Métodos disponibles:
- `registro()` - Registrar usuario
- `login()` - Iniciar sesión
- `obtenerPerfil()` - Obtener datos del usuario
- `crearSimulacion()` - Guardar simulación
- `obtenerSimulacion()` - Obtener simulación por ID
- `listarSimulaciones()` - Listar simulaciones del usuario

## Store (Zustand)

### authStore.ts
```typescript
useAuthStore()
  .usuario          // Usuario autenticado
  .token            // JWT token
  .isAuthenticated  // Estado de autenticación
  .isLoading        // Loading state
  .error            // Mensaje de error
  .login()          // Guardar usuario y token
  .logout()         // Limpiar sesión
```

## Hooks

### useAuth()
```typescript
const { usuario, token, isAuthenticated, login, logout } = useAuth();
```

## Utilidades

### formatters.ts
```typescript
formatTemperature(32.5)     // "32.5°C"
formatPower(1500)           // "1.5 kW"
formatEnergy(150)           // "150.00 kWh"
formatCurrency(45.50)       // "USD 45.50"
formatBTU(18000)            // "18,000 BTU/h"
getColorForTemperature(30)  // "text-orange-600"
getBgColorForTemperature(30) // "bg-orange-100"
```

## Rutas Disponibles

```
/                          - Dashboard (público)
/login                     - Iniciar sesión (público)
/registro                  - Registrarse (público)
/simuladores/techo-termico - Simulador Térmico (protegido)
/simuladores/calculadora-btu - Calculadora BTU (protegido)
/simuladores/temperatura-tanques - Temperatura Tanques (protegido)
```

## Build para Producción

```bash
npm run build

# Output en: dist/
# Servir con: npm run preview
```

## Despliegue

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Servidor Manual (nginx)
```nginx
server {
    listen 80;
    server_name tudominio.com;
    root /var/www/termomagangue/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

## Performance

- Vite para build ultrarrápido
- Tree shaking automático
- Code splitting por rutas
- Lazy loading de componentes
- Optimización de imágenes

## Seguridad

- ✅ JWT token en localStorage
- ✅ Validación de formularios
- ✅ CORS desde backend
- ✅ XSS prevention
- ✅ CSRF protection (headers)

## Temas CSS

Tailwind con extensiones personalizadas:
- Colors: thermal (hot, warm, neutral, cool, cold)
- Animations: pulse-slow
- Utilidades globales: glass, card, btn, badge

## Errores Comunes

### "Cannot find module 'react'"
```bash
npm install
```

### "API connection failed"
```bash
# Verificar que backend está en http://localhost:5000
# Verificar CORS en backend
```

### Styles no cargan en producción
```bash
npm run build
# Revisar rutas en vite.config.ts
```

## Soporte

Email: support@thermomagangue.com
GitHub: https://github.com/termomagangue/frontend
