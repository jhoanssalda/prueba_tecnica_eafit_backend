const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../red/errors')

const secret = config.jwt.secret;

function assignToken (data){
    return jwt.sign(data, secret);
}

function verifyToken(token){
    return jwt.verify(token, secret)
}

const checkToken = {
    confirmToken: function (req){
        const decode = decodeHeader(req);
    }
}

function getToken(authorize){
    if(!authorize){
        throw error('No hay token', 401);
    }

    if(authorize.indexOf('Bearer') === -1){
        throw error('Formato inválido', 401);
    }

    let token = authorize.replace('Bearer ', '');
    return token;
}

function decodeHeader(req){
    const authorize = req.headers.authorization || '';
    const token = getToken(authorize);
    const decoded = verifyToken(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    assignToken, 
    checkToken
}