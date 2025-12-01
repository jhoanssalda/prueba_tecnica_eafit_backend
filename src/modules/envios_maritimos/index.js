const db = require('../../database/mysqlConnection');
const ctrl = require('./enviosMaritimosController');

module.exports = ctrl(db);