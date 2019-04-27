const { Router } = require('express');
const service =  require('../services/toggle-service');

const router = Router();

router.get('/v1/toggle-service/ping', (req, res) => {
    res.json(service.ping());
});

router.post('/v1/toggle-service/create/', (req, res) => {
    if (req.body.name === undefined){
        res.status(400).send('Request without name attribute on body');
        return;
    }
    res.json(service.createApplication(req.body.name));
});

router.post('/v1/toggle-service/create-user/', (req, res) => {
    if(req.body.email === undefined){
        res.status(400).send('Request without email attribute on body');
        return;
    }

    if(req.body.password === undefined){
        res.status(400).send('Request without password attribute on body');
        return;
    }

    service.createNewUser(req.body.email, req.body.password)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(500).send(error.code);
        });
});


router.post('/v1/toggle-service/signin/', (req, res) => {
    service.signInWith(req.body.email, req.body.password)
        .then(response => {
            res.json(response);
        })
        .catch(error =>{
            res.status(500).send(error.code);
        });
});

module.exports = router;