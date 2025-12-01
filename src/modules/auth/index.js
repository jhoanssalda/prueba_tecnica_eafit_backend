const db = require('../../database/mysqlConnection');
const ctrl = require('./authController');

module.exports = ctrl(db);