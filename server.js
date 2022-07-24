// Instagram API Server

// import  
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const morgan = require('morgan');


// config
const logger = require('./config/logs/logger');
const swaggerOption = require('./config/documentation/swaggerOption');
const errorHandler = require('./api/utils/errorHandler.utils');
const output = require('./api/utils/output.utils');
const routes = require('./api/routes/main.routes');
require('dotenv').config();


// env Variables
const port = process.env.LISTEN_PORT || 1000;
const host = process.env.HOST;


// Creating express app
const app = express();

// setting morgan
app.use(morgan('dev'));

// Data to json
app.use(express.json());

// Swagger Route
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// static public folder
app.use(express.static('./uploads'));

// getting routes
app.use(routes);

// for output
app.use(output);

// For Errors
app.use(errorHandler);

// Listening to port 1000 
app.listen(port, () => {
    logger.info(`Server Running on http://${host}:${port}/api-docs`);
});