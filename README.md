# Express TypeScript Boilerplate

A production-ready Express.js boilerplate with TypeScript, featuring robust security, logging, API documentation, and best practices.

## Features

- 🚀 **Express.js with TypeScript** - Type-safe server-side development
- 🔒 **Security Features**
  - Helmet for secure headers
  - CORS protection
  - Rate limiting
  - HPP (HTTP Parameter Pollution) protection
- 📝 **API Documentation**
  - Swagger/OpenAPI integration
  - Interactive API documentation UI
- 🪵 **Logging & Monitoring**
  - Winston for logging
  - Morgan for HTTP request logging
- ✨ **Code Quality**
  - ESLint for linting
  - Prettier for code formatting
  - Husky for git hooks
  - Conventional commits with commitlint
- 🧪 **Testing**
  - Jest setup for unit testing
  - Supertest for integration testing
  - Coverage reporting
- 🎯 **Development Tools**
  - Nodemon for hot reloading
  - TypeScript path aliases
  - Environment variables management
- 🗃️ **Database Integration**
  - Prisma ORM setup
  - Database migrations
  - Seeding functionality

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (if using Prisma)

## Quick Start

1. Clone the repository:
   git clone <https://github.com/KinetoCebPac/express-ts-boilerplate.git>
   cd express-ts-boilerplate
2. Install dependencies:
   npm install
3. Set up environment variables:
   cp .env.example .env
4. Configure your environment variables in `.env`:
   env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
5. Initialize Prisma and generate client:
   npm run prisma:generate
   npm run db:migrate
6. Start the development server:
   npm run dev

## Available Scripts

### Development

```bash
npm run dev     # Start development server with hot reload
npm run build   # Build for production
npm start       # Start production server
```

### Database

```bash
npm run db:migrate      # Run database migrations
npm run db:deploy      # Deploy database migrations
npm run db:seed        # Seed the database
npm run prisma:generate # Generate Prisma client
npm run prisma:studio   # Open Prisma Studio
```

### Testing

```bash
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate test coverage
```

### Code Quality

```bash
npm run lint      # Run ESLint
npm run lint:fix  # Fix ESLint errors
```

## Project Structure

```
├── src/
│   ├── config/           # Configuration files
│   │   └── index.ts     # Environment variables & app config
│   ├── middleware/       # Express middlewares
│   │   └── error.middleware.ts
│   ├── models/          # Data models
│   │   └── user.model.ts
│   ├── routes/          # API routes
│   │   ├── index.ts
│   │   └── health.routes.ts
│   ├── utils/           # Utility functions
│   │   ├── logger.ts
│   │   ├── prisma.ts
│   │   ├── custom-error.ts
│   │   └── swagger.ts
│   ├── app.ts          # Express app setup
│   └── index.ts        # App entry point
├── prisma/
│   ├── schema.prisma   # Prisma schema
│   └── seed.ts        # Database seeder
├── tests/             # Test files
├── .env              # Environment variables
├── .eslintrc.js     # ESLint configuration
├── .prettierrc      # Prettier configuration
├── jest.config.js   # Jest configuration
└── tsconfig.json    # TypeScript configuration
```

## Configuration

### Environment Variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## API Documentation

The API documentation is available through Swagger UI when the server is running:

- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/api-docs.json`

### Available Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api-docs` - API documentation
- `GET /api-docs.json` - OpenAPI specification

### Security Features

#### Implemented Security Measures

1. **Helmet**: Secure HTTP headers
2. **CORS**: Cross-Origin Resource Sharing
3. **Rate Limiting**: Protect against brute force

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
```

4. **HPP**: Protect against HTTP Parameter Pollution

```typescript
app.use(hpp());
```

## Error Handling

```typescript
export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
  ) {
    super(message);
  }
}
```

Usage example:

```typescript
throw new CustomError('Resource not found', 404);
```

## Logging

```typescript
const logger = winston.createLogger({
  level: config.isProduction ? 'info' : 'debug',
  format: config.isProduction ? formats.production : formats.development,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

## Testing

```typescript
describe('Health Check', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
```

## Git Hooks

This project uses Husky for Git hooks:

- Pre-commit: Runs linting and formatting
- Commit message: Ensures conventional commit format

### Conventional Commits

Commit messages should follow the pattern:
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]

### Commit Types

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- chore: Updating build tasks, package manager configs, etc; no production code change

## Database

### Prisma Setup

1. Update schema in `prisma/schema.prisma`
2. Generate Prisma Client:
   npm run prisma:generate
3. Run database migrations:
   npm run db:migrate
4. Seed the database:
   npm run db:seed

### Example Model

```prisma
model User {
   id String @id @default(cuid())
   name String
   email String @unique
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the repository.

## Acknowledgments

- Express.js
- TypeScript
- Prisma
- Swagger
- Jest
- Winston

## Deployment

### Deploying to Vercel

This project can be easily deployed to Vercel. Here's how:

1. Install Vercel CLI (optional):

```bash
npm i -g vercel
```

2. Configure your `vercel.json` in the root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```

3. Deploy using one of these methods:
   - Using Vercel CLI: Run `vercel` in your project directory
   - Using Vercel Dashboard: Import your repository directly from GitHub
   - Using Vercel GitHub Integration: Connect your repository for automatic deployments

Remember to:

- Configure your environment variables in the Vercel dashboard
- Set up your database connection string for production
- Ensure your Prisma schema is properly deployed
