const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Task = require('../../models/Task')

router.get('/user/:user_id', (req, res) => {
    Task.find({user: req.params.user_id})
        .sort({ date: -1 })
        .then(tasks => res.json(tasks))
        .catch(err =>
            res.status(404).json({ notasksfound: 'No tasks found from this user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err =>
            res.status(404).json({ notaskfound: 'No task found with that ID' })
        );
});

module.exports = router;