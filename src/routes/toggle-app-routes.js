const { Router } = require('express');
const service =  require('../services/toggle-service');

const router = Router();

router.get('/v1/toggle-service/ping', (req, res) => {
    res.json(service.ping());
});

router.get('/v1/toggle-service/create', (req, res) => {
    res.json(service.create());
});

module.exports = router;