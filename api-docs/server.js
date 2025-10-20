const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Load the OpenAPI specification
const openApiSpec = YAML.load(path.join(__dirname, 'openapi.yaml'));

// Configure Swagger UI options
const swaggerUiOptions = {
  swaggerOptions: {
    url: '/api-docs/swagger.json',
    // Set the server URL for "Try it out" functionality
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    // OAuth configuration
    oauth2RedirectUrl: `http://localhost:${port}/api-docs/oauth2-redirect.html`,
    initOAuth: {
      clientId: process.env.OAUTH_CLIENT_ID || 'your-client-id',
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      appName: 'Narratives API Documentation',
      scopeSeparator: ' ',
      scopes: 'openid profile email',
      usePkceWithAuthorizationCodeGrant: true
    }
  }
};

// Serve the OpenAPI spec as JSON for Swagger UI
app.get('/api-docs/swagger.json', (req, res) => {
  res.json(openApiSpec);
});

// Serve Swagger UI with custom options
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, swaggerUiOptions));

// Redirect root to docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Start the server
app.listen(port, () => {
  console.log(`API documentation server running at http://localhost:${port}/api-docs`);
});
