const mysql = require('mysql');
const config = require('../config');
const { connect } = require('../app');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port,
}

let connection;

function connectMySQL(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if (err){
            console.log('[db err]', err);
            setTimeout(connectMySQL, 200);
        }else{
            console.log('DB connected');
        }
    });

    connection.on('error', err => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            connectMySQL();
        }else{
            throw err;
        }
    })
}

connectMySQL();

function select(tabla, id){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}

function selectAll(tabla){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}

function aggregate(tabla, data){
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}


function deletee(tabla, data){
    return new Promise( (resolve, reject) => {
        connection.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}

function query(tabla, query){
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE ?`, query, (error, result) => {
            return error ? reject(error): resolve(result[0]);
        })
    });
}

module.exports ={
    select,
    selectAll,
    aggregate,
    deletee,
    query,
}