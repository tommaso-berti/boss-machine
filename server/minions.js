const express = require('express');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase } = require("./db");
const minionsRouter = express.Router();

const model = 'minions';

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase(model))
});

minionsRouter.param('minionId', (req, res, next, minionId) => {
    try {
        const found = getFromDatabaseById(model, minionId);
        if(found){
            req.minion = found
            next()
        } else {
            next(new Error('No minion found for the provided id'));
        }
    } catch(err){
        next(err);
    }
})

minionsRouter.get('/:minionId', (req, res, next) => {
    if(req.minion) {
        res.status(200).send(req.newMinion);
    }
    else {
        res.status(404).send('No Minion Found');
    }
})

minionsRouter.post('/', (req, res, next) => {
    const name =  toString(req.body.name);
    const title =  toString(req.body.title);
    const salary =  Number(req.body.salary);
    if(!name || !title || !salary){
        res.status(400).send({})
    } else {
        let newMinion = addToDatabase(model, {
            name,
            title,
            salary
        });
        res.status(201).send(newMinion)
    }
})

module.exports = minionsRouter;