import { Router } from 'express';
import { healthRouter } from './health.routes';
// Import other route modules here

export const routes = Router();

routes.use('/health', healthRouter);
// Add other routes here
