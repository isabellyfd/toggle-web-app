const { Router } = require('express');
const service =  require('../services/toggle-service');

const router = Router();

router.get('/v1/toggle-service/ping', (req, res) => {
    res.json(service.ping());
});

router.post('/v1/toggle-service/create/', (req, res) => {
    if (req.body.name === undefined){
        res.status(400).send('Bad request without name attribute on body');
        return;
    }
    res.json(service.createApplication(req.body.name));
});

router.post('/v1/toggle-service/create-user/', (req, res) => {
    service.createUser(req.body.email, req.body.password)
        .then((response) => {
            console.log(response);
            res.json(response);
        })
        .catch((error => {
            res.status(500).send(error.code);
        }));
});

module.exports = router;