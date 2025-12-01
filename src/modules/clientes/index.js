const db = require('../../database/mysqlConnection');
const ctrl = require('./clientesController');

module.exports = ctrl(db);