const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase } = require("./db");

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
            res.status(404).send('No minion found for the provided id');
        }
    } catch(err){
        next(err);
    }
})

minionsRouter.get('/:minionId', (req, res, next) => {
    if(req.minion) {
        res.status(200).send(req.minion);
    }
    else {
        res.status(404).send('No Minion Found');
    }
})

minionsRouter.post('/', (req, res, next) => {
    const name =  toString(req.body.name);
    const title =  toString(req.body.title);
    const salary =  Number(req.body.salary);
    if (!name || !title || isNaN(salary)) {
        return res.status(400).send({});
    }

    const newMinion = addToDatabase(model, {
        ...req.body,
        salary
    });

    res.status(201).send(newMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minion = req.minion;

    const updatedMinion = updateInstanceInDatabase(model, {
        ...minion,
        name: req.body.name !== undefined ? req.body.name : minion.name,
        title: req.body.title !== undefined ? req.body.title : minion.title,
        salary: req.body.salary !== undefined ? Number(req.body.salary) : minion.salary
    });

    if (!updatedMinion || isNaN(updatedMinion.salary)) {
        return res.status(400).send({});
    }

    res.status(200).send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.minion.id
    let deleted = deleteFromDatabasebyId(model, minionId);
    if(!deleted){
        return res.status(404).send({});
    }
    else {
        return res.status(204).send();
    }
})


module.exports = minionsRouter;







































