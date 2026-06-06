# Quick Start Guide - TermoMagangué

## 🚀 Opción 1: Instalación Manual (Recomendado para desarrollo)

### Requisitos
- Node.js 18+
- MySQL 8+
- Git

### Pasos

1. **Backend Setup**
```bash
cd backend_tcc
npm install
cp .env.example .env
# Editar .env con tu configuración
npm run build
npm run dev  # En terminal 1
```

2. **Frontend Setup**
```bash
cd Frontend_tcc
npm install
npm run dev  # En terminal 2
```

3. **Base de Datos**
```bash
mysql -u root -p
CREATE DATABASE termomagangue;
# Las tablas se crearán automáticamente
```

### Acceso
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Swagger Docs: http://localhost:5000/api-docs

---

## 🐳 Opción 2: Con Docker (Recomendado para producción)

### Requisitos
- Docker
- Docker Compose

### Pasos

```bash
# 1. En la raíz del proyecto
docker-compose up

# 2. Esperar a que todo esté listo (~30 segundos)

# 3. Acceder
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MySQL: localhost:3306
```

### Detener
```bash
docker-compose down
```

### Limpiar volúmenes
```bash
docker-compose down -v
```

---

## 📋 Primer Uso

1. **Registrarse**
   - Click en "Registrarse"
   - Llenar formulario
   - Seleccionar rol (estudiante/docente/habitante)

2. **Usar Simulador**
   - Click en un simulador desde dashboard
   - Completar formulario
   - Presionar "Calcular"
   - Ver resultados y gráficos

3. **Exportar**
   - Click en "Exportar PDF/Excel" (próximamente)

---

## 🔧 Variables de Entorno

### Backend (.env)
```
DB_PASSWORD=root_password    # Cambiar en producción
JWT_SECRET=secret_key        # Cambiar en producción
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 Simuladores Disponibles

1. **Térmico de Techos** → `/simuladores/techo-termico`
2. **Calculadora BTU** → `/simuladores/calculadora-btu`
3. **Temperatura Tanques** → `/simuladores/temperatura-tanques`
4. (Más en desarrollo...)

---

## 🐛 Troubleshooting

### Puerto ya en uso
```bash
# Cambiar puerto en backend .env
PORT=5001

# O matar proceso:
lsof -i :5000  # Ver proceso
kill -9 <PID>   # Terminar
```

### Error de BD
```bash
# Verificar conexión MySQL
mysql -u root -p
show databases;
```

### Dependencias faltantes
```bash
npm install
```

---

## 📚 Documentación Completa

- [README.md](README.md) - Descripción general
- [ARQUITECTURA.md](ARQUITECTURA.md) - Diseño técnico
- [backend_tcc/SETUP.md](backend_tcc/SETUP.md) - Setup backend
- [Frontend_tcc/SETUP.md](Frontend_tcc/SETUP.md) - Setup frontend

---

## 🆘 Soporte

Email: support@thermomagangue.com
GitHub: https://github.com/termomagangue

---

**¡Listo para usar! 🎉**
