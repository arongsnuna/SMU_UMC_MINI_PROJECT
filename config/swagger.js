//swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    info: {
      title: 'UMC_MINI_PROJECT_API',
      version: '1.0.0',
      description: 'UMC_MINI_PROJECT_API, API 설명',
    },
    host: `${process.env.SERVER_IP}`,
    basePath: '/',
    schemes: ['http'],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Bearer token to access these API endpoints',
      },
    },
  },
  apis: ['./config/swagger.js', './srcs/routes/*.js', './config/swagger/*'], 
};
const specs = swaggerJSDoc(options);

export { specs }; 
