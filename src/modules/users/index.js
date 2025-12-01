const db = require('../../database/mysqlConnection');
const ctrl = require('./usersController');

module.exports = ctrl(db);