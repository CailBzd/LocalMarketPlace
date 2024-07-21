import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation de l\'API pour votre application Next.js',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./pages/api/**/*.ts'], // Chemin vers les fichiers d'API
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
