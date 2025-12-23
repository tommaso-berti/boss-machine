const express = require('express');
//with merge params, :minionId won't be accessible
const workRouter = express.Router({mergeParams:true});
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require("./db");

const model = 'work';

workRouter.get('/', (req, res, next) => {
    const allWorks = getAllFromDatabase(model);
    const found = allWorks.filter(work => work.minionId === req.params.minionId);
    res.status(200).send(found);
});

workRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', {
        ...req.body,
        minionId: req.params.minionId
    });
    res.status(201).send(newWork);
});

workRouter.param('workId', (req, res, next, workId) => {
    try {
        const found = getFromDatabaseById(model, workId);
        if(found){
            req.work = found
            next()
        } else {
            res.status(404).send('No work found for the provided id');
        }
    } catch(err){
        next(err);
    }
})


workRouter.put('/:workId', (req, res, next) => {
    const work = req.work;
    if (work.minionId !== req.params.minionId) {
        return res.status(400).send({});
    }
    const updatedWork = updateInstanceInDatabase(model, {
        id: work.id,
        title: req.body.title !== undefined ? req.body.title : work.title,
        description: req.body.description !== undefined ? req.body.description : work.description,
        hours: req.body.hours !== undefined ? Number(req.body.hours) : work.hours,
        minionId: req.params.minionId
    });
    if (!updatedWork) return res.status(404).send({});
    res.status(200).send(updatedWork);
});

workRouter.delete('/:workId', (req, res, next) => {
    const workId = req.work.id;
    let deleted = deleteFromDatabasebyId(model, workId);
    if(!deleted){
        return res.status(404).send({});
    } else {
        return res.status(204).send();
    }
});

module.exports = workRouter;