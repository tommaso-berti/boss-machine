const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require("./db");

const model = 'ideas';

ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase(model))
})

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    try {
        const found = getFromDatabaseById(model, ideaId);
        if(found) {
            req.idea = found;
            next()
        }else {
            res.status(404).send('No idea found for the provided id');
        }
    } catch (err) {
        next(err)
    }
})

ideasRouter.get('/:ideaId', (req, res) => {
    if(req.idea) {
        res.status(200).send(req.idea)
    } else {
        res.status(404).send('No idea found');
    }
})

ideasRouter.post('/', (req, res, next) => {
    const name =  toString(req.body.name);
    const description =  toString(req.body.description);
    const numWeeks = Number(req.body.numWeeks);
    const weeklyRevenue = Number(req.body.weeklyRevenue);
    if (!name || !description || isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        return res.status(404).send({});
    }
    const newIdea = addToDatabase(model, {
        ...req.body
    });
    res.status(201).send(newIdea);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    const idea = req.idea;
    const updatedIdea = updateInstanceInDatabase(model, {
        ...idea,
        name: req.body.name !== undefined ? req.body.name : idea.name,
        description: req.body.description !== undefined ? req.body.description : idea.description,
        numWeeks: req.body.numWeeks !== undefined ? Number(req.body.numWeeks) : idea.numWeeks,
        weeklyRevenue: req.body.weeklyRevenue !== undefined ? Number(req.body.weeklyRevenue) : idea.weeklyRevenue,
    });
    if(!updatedIdea) {
        return res.status(400).send({});
    }
    res.status(200).send(updatedIdea);
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.idea.id;
    const deleted = deleteFromDatabasebyId(model, ideaId);
    if(!deleted) {
        return res.status(404).send({});
    } else {
        return res.status(204).send();
    }
})

module.exports = ideasRouter;