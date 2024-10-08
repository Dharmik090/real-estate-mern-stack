const express = require('express');
const router = express.Router();
const controller = require('../controller/propertyController');

router.post('/property/:userid',controller.addProperty);

router.get('/properties',controller.getProperties);

router.get('/property/:id',controller.getPropertyById);

router.get('/property/:userid',controller.getPropertyByUserId);

router.put('/property/:id',controller.updateProperty);

router.delete('/property/:id',controller.deletePropertyById);

module.exports = router;