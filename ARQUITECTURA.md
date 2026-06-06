# Arquitectura TermoMagangué

## Visión General

TermoMagangué es una aplicación web de **3 capas** con una estructura moderna y escalable:

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + TS)                    │
│              http://localhost:3000 (Vite Dev)              │
├─────────────────────────────────────────────────────────────┤
│  Components │ Pages │ Hooks │ Store (Zustand) │ Services   │
├─────────────────────────────────────────────────────────────┤
│                    HTTP/REST API (Axios)                    │
├─────────────────────────────────────────────────────────────┤
│                  BACKEND (Node.js + Express)                │
│              http://localhost:5000 (Express)               │
├─────────────────────────────────────────────────────────────┤
│ Routes │ Controllers │ Services │ Models │ Middleware       │
├─────────────────────────────────────────────────────────────┤
│                 MySQL Database (Puerto 3306)                │
│              (usuarios, simulaciones, historial)            │
└─────────────────────────────────────────────────────────────┘
```

## Flujo de Datos

### 1. Autenticación
```
1. Usuario ingresa credenciales → LoginPage
2. Axios POST /api/auth/login → Backend
3. Backend valida contra BD MySQL
4. Genera JWT token y retorna
5. Frontend guarda token en localStorage
6. Axios interceptor agrega Authorization header
```

### 2. Simulación
```
1. Usuario completa formulario → SimuladorComponent
2. Calcula localmente o envía al backend
3. Backend ejecuta fórmulas termodinámicas
4. Guarda en BD (simulaciones table)
5. Retorna resultados en JSON
6. Frontend renderiza gráficos con Recharts
7. Opción de exportar a PDF/Excel
```

### 3. Historial
```
1. Usuario accede a /historial
2. Frontend solicita simulaciones via API
3. Backend filtra por usuario_id
4. Retorna paginado de BD
5. Frontend muestra lista con filtros
6. Click abre detalles de simulación
```

## Patrones Implementados

### 1. MVC (Model-View-Controller) - Backend
- **Models**: `UsuarioModel`, `SimulacionModel`, `HistorialModel`
- **Controllers**: Lógica de negocio
- **Routes**: Definición de endpoints

### 2. Component Pattern - Frontend
- **Page Components**: Routed pages
- **Feature Components**: Simulators
- **UI Components**: Reusable (Card, Button, Input)
- **Layout Components**: Navbar, Footer

### 3. Custom Hooks
- `useAuth()`: State management de autenticación
- Posibilidad de agregar `usePagination()`, `useForm()`, etc.

### 4. State Management
- **Zustand**: Para estado global (auth)
- **Local state**: Para formularios
- **Server state**: API responses

### 5. Type Safety
- Interfaz `Usuario`, `Simulacion`, `ApiResponse`
- Generics para respuestas paginadas
- Tipos para cada simulador

## Base de Datos - Esquema

### Tabla: usuarios
```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('estudiante', 'docente', 'admin', 'habitante'),
    fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    INDEX idx_correo (correo),
    INDEX idx_rol (rol)
);
```

### Tabla: simulaciones
```sql
CREATE TABLE simulaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuarioId INT NOT NULL,
    tipo ENUM('techo_termico', 'calculadora_btu', ...),
    titulo VARCHAR(255),
    parametros JSON NOT NULL,
    resultados JSON NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
    INDEX idx_usuarioId (usuarioId),
    INDEX idx_tipo (tipo),
    INDEX idx_fecha (fecha)
);
```

### Tabla: historial
```sql
CREATE TABLE historial (
    id INT PRIMARY KEY AUTO_INCREMENT,
    simulacionId INT NOT NULL,
    accion VARCHAR(50) NOT NULL,
    detalles JSON,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (simulacionId) REFERENCES simulaciones(id),
    INDEX idx_simulacionId (simulacionId)
);
```

## API REST - Estructura

```
/api
├── /auth
│   ├── POST /registro          # Crear usuario
│   └── POST /login             # Obtener JWT
├── /usuarios
│   ├── GET /me                 # Perfil actual
│   └── GET / (admin)           # Listar todos
└── /simulaciones
    ├── POST /                  # Crear
    ├── GET /:id                # Obtener
    ├── GET /                   # Listar
    ├── PUT /:id                # Actualizar
    └── DELETE /:id             # Eliminar
```

## Seguridad - Capas

### 1. Frontend
- ✅ XSS Prevention (React escapa HTML)
- ✅ CSRF tokens si es necesario
- ✅ Validación de formularios
- ✅ Token en localStorage (considerar httpOnly)

### 2. Backend
- ✅ Bcryptjs (10 rondas salt)
- ✅ JWT con expiración
- ✅ CORS configurado
- ✅ Helmet headers
- ✅ Validación de entrada (express-validator)
- ✅ Rate limiting (recomendado)

### 3. Base de Datos
- ✅ Prepared statements (mysql2/promise)
- ✅ Índices en PK y FK
- ✅ Relaciones referenciadas

## Performance - Optimizaciones

### Frontend
- Vite: Build ultrarrápido
- Tree shaking de librerías
- Code splitting automático
- Lazy loading de componentes
- Imagen optimization

### Backend
- Connection pooling (mysql2)
- Índices en BD
- Paginación en listados
- Compresión gzip (Helmet)
- Caching HTTP headers

### DevOps
- Minificación en producción
- Source maps deshabilitados en prod
- Environment variables seguros

## Escalabilidad Futura

### Fase 1 (Actual)
- Monolítico
- BD centralizada
- Autenticación JWT

### Fase 2 (Próxima)
- Caché Redis para sesiones
- Queue (Bull) para tareas pesadas
- Websockets para live updates
- CDN para assets estáticos

### Fase 3 (Largo plazo)
- Microservicios
- Docker containers
- Kubernetes orchestration
- Elasticidad automática

## Testing

### Frontend
```bash
npm run test  # Jest + React Testing Library
```

### Backend
```bash
npm run test  # Jest + Supertest
```

### E2E (Próximo)
```bash
npm run test:e2e  # Cypress o Playwright
```

## Monitoreo

### Recomendado para Producción
- **Application**: Sentry, LogRocket
- **Infrastructure**: Prometheus, Grafana
- **APM**: New Relic, DataDog
- **Logs**: ELK Stack, CloudWatch

## Despliegue

### Desarrollo
```bash
npm run dev        # Frontend
npm run dev        # Backend
```

### Staging
```bash
docker-compose -f docker-compose.staging.yml up
```

### Producción
```bash
# Usar CI/CD (GitHub Actions, GitLab CI, etc)
# Docker containers en Kubernetes
# DNS + Load Balancer
# SSL/TLS certificates
```

## Diagrama de Componentes Frontend

```
App
├── Navbar
├── Router
│   ├── DashboardPage
│   ├── LoginPage
│   ├── RegistroPage
│   └── [Simuladores]
│       ├── SimuladorTechoTermico
│       │   ├── Inputs (temperatura, hora, etc)
│       │   ├── Button (Calcular)
│       │   └── LineChart (Resultados)
│       ├── CalculadoraBTU
│       │   ├── Inputs (dimensiones)
│       │   └── Cards (Resultados)
│       └── Más simuladores...
└── Footer
```

## Estado Global (Zustand)

```typescript
useAuthStore
├── usuario
│   ├── id
│   ├── nombre
│   ├── correo
│   └── rol
├── token (JWT)
├── isAuthenticated
├── isLoading
├── error
└── actions
    ├── setUsuario()
    ├── setToken()
    ├── login()
    └── logout()
```

## Flujo de Autenticación

```
[LoginPage]
    ↓
[apiService.login()]
    ↓
[Backend POST /api/auth/login]
    ↓
[Valida BD] → [Genera JWT]
    ↓
[Retorna { usuario, token }]
    ↓
[useAuthStore.login()]
    ↓
[localStorage.token]
    ↓
[axios interceptor agrega header]
    ↓
[ProtectedRoute permite acceso]
```

## Mantenimiento

### Code Quality
- Linting: ESLint
- Formatting: Prettier
- Type checking: TypeScript
- Testing coverage: >70%

### Documentation
- API Swagger/OpenAPI
- README con guías
- Inline comments en código complejo
- Changelog actualizado

### Versioning
- Semver (1.0.0)
- Tags en Git
- Release notes

---

**Última actualización**: 2024
**Versión**: 1.0.0
**Status**: Desarrollo
