import request from 'supertest';
import { createApp } from '../app';

describe('Health Check', () => {
  const app = createApp();

  it('should return 200 OK for health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should return 200 OK for root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to the API' });
  });

  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/undefined-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Route not found',
    });
  });
});
