import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';
import { routes } from './routes';
import { swaggerSpec } from './utils/swagger';

export const createApp = (): Application => {
  const app: Application = express();

  // Security Middleware
  app.use(helmet());
  app.use(cors());
  app.use(hpp());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Compression middleware
  app.use(compression());

  // Logging
  app.use(
    morgan('combined', {
      stream: { write: (message) => logger.info(message.trim()) },
    }),
  );

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // API Routes
  app.use('/api', routes);

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // Index route
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
  });

  // Handle undefined routes
  app.use('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Route not found',
    });
  });

  // Error handling
  app.use(errorHandler);

  return app;
};
