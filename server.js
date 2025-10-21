const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Load the OpenAPI specification
const openApiSpec = YAML.load(path.join(__dirname, 'openapi.yaml'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Redirect root to docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Start the server
app.listen(port, () => {
  console.log(`API documentation server running at http://localhost:${port}/api-docs`);
});