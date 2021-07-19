const express = require('express')
const router = express.Router()
const Task = require('../../models/Task')

// new task route
router.post('/new',(req,res)=>{
  newTask = new Task({
    title: req.body.title,
    user: req.body.user,
    description: req.body.description,
    recurrence: req.body.recurrence,
    startDate: req.body.startDate,
    daysOfTheWeek: req.body.daysOfTheWeek,
    dueDate: req.body.dueDate,
  })
  newTask.save()
  res.json({msg: 'success'})
})

// update task route
router.post('/:taskId',(req,res)=>{
  task = Task.findById(req.params.taskId)
  for(field in req){
    task[field] = req[field]
  }
  task.save()
})

// get a single task
router.get('/:taskId',(req,res)=>{
  task = Task.findById(req.params.taskId)
  res.json(task)
})

// get all tasks
router.get('/',(req,res)=>{
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(404).json({msg: 'no tasks found'}))
})

module.exports = router