const express = require('express');

const security = require('../../security/security');

const response = require('../../red/respuestas');
const controller = require('./index');

const router = express.Router();

router.get('/', security(), selectAll);
router.get('/:id', security(), select);
router.post('/', security(), aggregate);
router.put('/', security(), deletee);

async function selectAll (req, res, next) {
    try {
        const items =  await controller.selectAll();
        response.success(req, res, items, 200)
    } catch (error) {
        next(error);
    }
    
};

async function select (req, res, next) {
    try {
        const item =  await controller.select(req.params.id);
        response.success(req, res, item, 200);
    } catch (error) {
        next(error);
    }  
};

async function aggregate (req, res, next) {
    try {
        const item =  await controller.aggregate(req.body);
        if(req.body.id == 0)
            mensaje = 'Registro creado con éxito';
        else mensaje = 'Registro actualizado con éxito';
        response.success(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }  
};

async function deletee (req, res, next) {
    try {
        const item =  await controller.deletee(req.body);
        response.success(req, res, 'registro eliminado correcamente', 200);
    } catch (error) {
        next(error);
    }  
};

module.exports = router;