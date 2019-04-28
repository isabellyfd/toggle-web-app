const { Router } = require('express');
const service =  require('../services/toggle-service');
const winston = require('winston');
const router = Router();

router.post('/v1/toggle-service/create-application/', (req, res) => {
    const name  = req.body.name;
    const userId = req.body.userId;

    if (name === undefined || userId === undefined){
        winston.info(`Bad request with body parameters name = ${name} and userId = ${userId}`);
        res.status(400).send('Request without the required attributes on body');
        return;
    }
    service.createApplicationForUserwithName(userId, name)
        .then(() => {
            winston.info(`application with name = ${name} created for user with id = ${userId}`);
            res.sendStatus(200);
        })
        .catch(error => {
            winston.info(`application creation failed name = ${name} for user with id = ${userId}`);
            res.sendStatus(500);
        });
});

router.post('/v1/toggle-service/create-user/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email === undefined || password === undefined){
        winston.info(`Bad request with body parameters email = ${email} and password = ${password}`);
        res.status(400).send('Request without the required attributes on body');
        return;
    }

    service.createNewUser(req.body.email, req.body.password)
        .then(response => {
            winston.info(`created user successfully with email = ${email}`);
            res.json(response);
        })
        .catch(error => {
            winston.info(`failed to create user with email = ${email}`);
            res.status(500).send(error.code);
        });
});

router.get('/v1/toggle-service/my-apps/:userId', (req, res) => {
    const userId = req.params.userId;
    if (userId === undefined) {
        winston.info(`Bad request with parameters userId = ${userId}`);
        res.sendStatus(400);
        return;
    }
    
    service.getApplicationsByUser(userId)
        .then(querySnapshot => {
            const personalApplications = querySnapshot.docs.map(doc => {
                const application = {
                    id: doc.id, 
                    name: doc.data().name, 
                    toggles: doc.data().toggles
                };
                return application;
            });
            res.status(200).send(personalApplications);
        })
        .catch(_ => res.sendStatus(500));
    
});

router.post('/v1/toggle-service/signin/', (req, res) => {
    service.signInWith(req.body.email, req.body.password)
        .then(response => {
            winston.info(`signin sucessful`);
            res.json(response);
        })
        .catch(error =>{
            winston.info(`could not signin`);
            res.status(500).send(error.code);
        });
});

router.get('/v1/toggle-service/ping', (req, res) => {
    res.json(service.ping());
});
module.exports = router;