// path to routes
const path = require('path');
const routes = path.join(__dirname, '../../api/routes/*.js');


// Swagger Options
const swaggerOption = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: 'Instagram App',
            version: '1.0.0',
            description: "This is the Documentation for the Instagram App API.",
        },
        servers: [{
            url: "http://localhost:1000"
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: "Please provide the valid access token, if you don't have please login and get the token as response!",
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [routes],
};


//exports
module.exports = swaggerOption;