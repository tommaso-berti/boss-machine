const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require("./db");

const model = 'meetings'

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase(model))
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    const savedMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(savedMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase(model);
    res.status(204).send();
});

module.exports = meetingsRouter;