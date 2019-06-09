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
            res.status(200).send('application created successfully');
        })
        .catch(error => {
            winston.info(`application creation failed name = ${name} for user with id = ${userId}`);
            res.status(500).send(error);
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
                    name: doc.data().name
                };
                return application;
            });
            res.status(200).send(personalApplications);
        })
        .catch(_ => res.sendStatus(500));
    
});

router.post('/v1/toggle-service/toggle/add', (req, res) => {
    const applicationId = req.body.applicationId;
    const toggleName = req.body.toggleName;
    const toggleValue = req.body.toggleValue;

    if (applicationId === undefined || toggleName === undefined || toggleValue === undefined) {
        winston.info(`Bad request with parameters applicationId = ${applicationId} toggleName = ${toggleName} toggleValue = ${toggleValue}`);
        res.status(400).send('Request without the required attributes on body');
        return;
    }

    service.addToggle(applicationId, toggleName, toggleValue)
        .then(response => {
            winston.info(`created toggle ${toggleName} = ${toggleValue} successfully for application ${applicationId}`);
            res.status(200).send(response);
        })
        .catch(error => {
            winston.info(`failed to create toggle ${toggleName} = ${toggleValue} for application ${applicationId}`);
            res.json(error)}
        );

});

router.get('/v1/toggle-service/toggles/:applicationId', (req, res) => {
    const applicationId = req.params.applicationId;
    if (applicationId === undefined) {
        winston.info(`Bad request with parameters applicationId = ${applicationId}`);
        res.sendStatus(400);
        return;
    }
    
    service.getTogglesForApplication(applicationId)
        .then(querySnapshot => {
            const personalApplications = querySnapshot.docs.map(doc => {
                const toggle = {
                    id: doc.id, 
                    name: doc.data().name, 
                    value: doc.data().value
                };
                return toggle;
            });
            res.status(200).send(personalApplications);
        })
        .catch(_ => res.sendStatus(500));
    
});

router.post('/v1/toggle-service/toggle/update', (req, res) => {
    const applicationId = req.body.applicationId;
    const toggleId = req.body.toggleId;
    const toggleName = req.body.toggleName;
    const toggleValue = req.body.toggleValue;

    if (applicationId === undefined || toggleId === undefined || toggleName === undefined || toggleValue === undefined) {
        winston.info(`Bad request with parameters applicationId = ${applicationId} toggleId = ${toggleId} toggleName = ${toggleName} toggleValue = ${toggleValue}`);
        res.status(400).send('Request without the required attributes on body');
        return;
    }

    service.updateToggle(applicationId, toggleId, toggleName, toggleValue)
        .then(response => {
            winston.info(`created toggle ${toggleName} = ${toggleValue} successfully for application ${applicationId}`);
            res.status(200).send(response);
        })
        .catch(error => {
            winston.info(`failed to create toggle ${toggleName} = ${toggleValue} for application ${applicationId}`);
            res.json(error)}
        );

});
router.post('/v1/toggle-service/signin/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    winston.info(`email = ${email}, password = ${password}`)

    service.signInWith(email, password)
        .catch(error => {
            res.status(200).json(error);
        })
    // service.signInWith(req.body.email, req.body.password)
    //     .catch(error =>{
    //         res.send(error).status(200);
    //     });
});

router.get('/v1/toggle-service/ping', (req, res) => {
    res.json(service.ping());
});
module.exports = router;