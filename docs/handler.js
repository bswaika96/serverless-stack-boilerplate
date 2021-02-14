const swaggerUi = require('aws-serverless-swagger-ui');
const swaggerHandler = swaggerUi.setup('./swagger.yml');

module.exports.main = async(event) => {
  if(event.path == '/docs')
    return { 
      statusCode: 301, 
      headers: {
        'Location': `docs/index.html`
      }
    };
  return (await swaggerHandler)(event);
};