import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerSpec from '../swagger';

const ApiDocs = () => {
  return <SwaggerUI spec={swaggerSpec} />;
};

export default ApiDocs;
