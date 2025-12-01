const db = require('../../database/mysqlConnection');
const ctrl = require('./enviosTerrestresController');

module.exports = ctrl(db);