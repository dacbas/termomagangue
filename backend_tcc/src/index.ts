import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import routes from './routes/index.js';
import { errorHandler } from './middleware/auth.js';
import { testConnection, initializeDatabase } from './database/index.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TermoMagangué API',
      version: '1.0.0',
      description: 'API REST para simuladores termodinámicos y de física',
      contact: {
        name: 'TermoMagangué Team',
        email: 'info@thermomagangue.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// API Routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});
// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

// Initialize and start server
async function startServer() {
  try {
    // Test database connection
    const connected = await testConnection();
    if (!connected) {
      console.error('No se pudo conectar a la base de datos. Abortando...');
      process.exit(1);
    }

    // Initialize database tables
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║     TermoMagangué API - v1.0.0         ║
║   Servidor ejecutándose en puerto      ║
║            ${PORT}                ║
╚════════════════════════════════════════╝
      `);
      console.log(`
📚 Documentación Swagger: http://localhost:${PORT}/api-docs
🏥 Health Check: http://localhost:${PORT}/health
🔌 API Base URL: http://localhost:${PORT}/api
      `);
    });
  } catch (error) {
    console.error('Error iniciando servidor:', error);
    process.exit(1);
  }
}

startServer();

export default app;
