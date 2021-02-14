const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const FILENAME = './swagger.yml';

const app = express();
const doc = YAML.load(FILENAME);

app.use('/', swaggerUi.serve, swaggerUi.setup(doc));

app.listen(3000, () => {
    console.log(`docs server running at PORT 3000...`);
});