const express = require('express');
const response = require('../../red/respuestas');
const controller = require('./index');

const router = express.Router();

router.get('/login', login);

async function login (req, res, next) {
    try {
        const token =  await controller.login(req.body.user, req.body.password);
        response.success(req, res, token, 200)
    } catch (error) {
        next(error);
    }
    
};

module.exports = router;