const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const FILENAME = './swagger.yml';
const PORT = process.env.PORT || 3000;

const app = express();
const doc = YAML.load(FILENAME);

app.use('/', swaggerUi.serve, swaggerUi.setup(doc));

app.listen(PORT, () => {
    console.log(`docs server running at PORT ${PORT}...`);
});