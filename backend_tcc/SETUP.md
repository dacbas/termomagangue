# TermoMagangué Backend - Guía de Instalación

## Requisitos

- Node.js 18+
- MySQL 8+
- npm o yarn

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Editar .env con tu configuración de BD

# 4. Compilar TypeScript
npm run build

# 5. Iniciar servidor
npm run dev
```

## Comandos Disponibles

```bash
npm run dev          # Iniciar en desarrollo con auto-reload
npm run build        # Compilar TypeScript
npm start            # Ejecutar versión compilada
npm run lint         # Ejecutar ESLint
npm run migrate      # Ejecutar migraciones
npm run test         # Ejecutar tests
```

## Estructura de Carpetas

```
src/
├── config/          # Configuraciones globales
├── database/        # Conexión MySQL y setup
├── models/          # Modelos de datos
├── routes/          # Rutas de API
├── controllers/     # Lógica de controladores
├── middleware/      # Middlewares (auth, error handling)
├── services/        # Servicios reutilizables
├── types/           # Tipos TypeScript
├── utils/           # Funciones utilitarias
│   ├── jwt.ts       # JWT token handling
│   ├── password.ts  # Password hashing
│   └── thermalCalculations.ts  # Fórmulas termodinámicas
└── index.ts         # Entry point
```

## Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```env
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=termomagangue
DB_PORT=3306

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Swagger
SWAGGER_ENABLED=true
```

## Endpoints de API

### Autenticación
- `POST /api/auth/registro` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/usuarios/me` - Obtener perfil (protegido)
- `GET /api/usuarios` - Listar usuarios (admin)

### Simulaciones
- `POST /api/simulaciones` - Crear simulación (protegido)
- `GET /api/simulaciones/:id` - Obtener simulación (protegido)
- `GET /api/simulaciones` - Listar simulaciones (protegido)

## Health Check

```bash
curl http://localhost:5000/health
```

Respuesta:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0"
}
```

## Documentación API (Swagger)

Disponible en: `http://localhost:5000/api-docs`

## Fórmulas Implementadas

El archivo `src/utils/thermalCalculations.ts` contiene todas las fórmulas termodinámicas:

1. **Transferencia de calor** (Techo Térmico)
2. **Cálculo BTU** (Aire Acondicionado)
3. **Consumo de Nevera**
4. **Temperatura de Tanques**
5. **Ventilación Nocturna**
6. **Simulador Acuícola**
7. **Secado de Arroz**
8. **Cadena de Frío**
9. **Deshidratador Solar**
10. **Enfriamiento de Leche**

## Autenticación

Se utiliza JWT (JSON Web Tokens) con Bearer token:

```
Authorization: Bearer <token>
```

El token se genera al login y tiene validez de 7 días.

## Rate Limiting

Para producción, se recomienda agregar rate limiting:

```bash
npm install express-rate-limit
```

## Errores Comunes

### "Cannot find module 'mysql2'"
```bash
npm install mysql2
```

### "Port already in use"
```bash
# Cambiar PORT en .env
PORT=5001
```

### "Access denied for user 'root'"
```bash
# Verificar credenciales de BD en .env
DB_USER=root
DB_PASSWORD=tu_contraseña
```

## Producción

```bash
# Compilar
npm run build

# Iniciar
npm start

# Con PM2
npm install -g pm2
pm2 start dist/index.js --name "TermoMagangué"
```

## Logs

Los logs se almacenan en `logs/` (crear carpeta si es necesario)

## Soporte

Email: support@thermomagangue.com
