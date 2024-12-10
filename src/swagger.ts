import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Определение настроек Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Text API',
      version: '1.0.0',
      description: 'API для работы с текстовыми нейросетями',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

// Генерация Swagger документации
const specs = swaggerJsdoc(options);

export { swaggerUi, specs };