const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const error = require('./red/errors');

const app = express();

//Definición de las rutas genéricas para las APIs
const clientes = require('./modules/clientes/clientes')
const users = require('./modules/users/users');
const auth = require('./modules/auth/auth');
const enviosMaritimos = require('./modules/envios_maritimos/enviosMaritimos');
const enviosTerrestres = require('./modules/envios_terrestres/enviosTerrestres');


//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuration
app.set('port', config.app.port);


app.use('/api/clientes', clientes);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/enviosMar', enviosMaritimos);
app.use('/api/enviosTer', enviosTerrestres);
app.use(error);

module.exports = app;