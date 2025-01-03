import { createApp } from './app';
import { config } from './config';
import { logger } from './utils/logger';

const app = createApp();

const startServer = () => {
  try {
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
