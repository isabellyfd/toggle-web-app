const { Router } = require('express');
const service =  require('../services/toggle-service');

const router = Router();

router.post('/v1/toggle-service/create-application/', (req, res) => {
    if (req.body.name === undefined){
        res.status(400).send('Request without name attribute on body');
        return;
    }
    service.createApplicationForUserwithName(req.body.userId, req.body.name)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        });
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

router.get('/v1/toggle-service/my-apps/:userId', (req, res) => {
    const userId = req.params.userId;
    if (userId === undefined) {
        res.sendStatus(500);
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
            res.json(response);
        })
        .catch(error =>{
            res.status(500).send(error.code);
        });
});

router.get('/v1/toggle-service/ping', (req, res) => {
    res.json(service.ping());
});
module.exports = router;