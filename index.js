const express = require('express');

require('dotenv').config();

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocumentV1 = require('./swagger.json');

const { LISTEN_PORT } = process.env;

const routerMain = require('./resolvers/main');
const routerUser = require('./resolvers/user');
const routerAdmin = require('./resolvers/admin');

app.use('/v1/main', routerMain);
app.use('/v1/user', routerUser);
app.use('/v1/admin', routerAdmin);

const options = {
    explorer: true
  };

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV1, options));

app.listen(LISTEN_PORT, ()=> {
    console.log(`server started in ${LISTEN_PORT} port`);
});
