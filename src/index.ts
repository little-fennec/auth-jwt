import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { MongoUserRepository } from './repositories/MongoUserRepository';
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Auth API',
      version: '1.0.0',
    },
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
  apis: ['./src/routes/*.ts'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const userRepository = new MongoUserRepository();
const authService = new AuthService(userRepository, config.jwtSecret);
const userService = new UserService(userRepository);
const authController = new AuthController(authService);
const userController = new UserController(userService);

app.use('/api', authRoutes(authController));
app.use('/api', userRoutes(userController, config.jwtSecret));

mongoose.connect(config.mongoUri)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  }); 