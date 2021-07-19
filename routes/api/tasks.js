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
router.put('/:taskId',(req,res)=>{
  Task.findById(req.params.taskId)
    .then(task=>{
      for(field in req.body){
        task[field] = req.body[field]
      }
      task.save()
      res.json({task: task})
    })
    .catch(err=>res.status(404).json({error: err}))
  
})

// get a single task
router.get('/:taskId',(req,res)=>{
  Task.findById(req.params.taskId)
    .then(task=>res.json(task))
    .catch(err=>res.status(404).json({error: err}))
})

// get all tasks
router.get('/',(req,res)=>{
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(404).json({msg: 'no tasks found'}))
})

// delete a task
router.delete('/:taskId',(req,res)=>{
  Task.findById(req.params.taskId)
    .then
})

module.exports = router

// user: 60f588bb3ee3cb100f85728c
// task1: 60f5aa5dbebcb620da43d32f
// task2: 60f5ab937372de2144b5f2d0
// token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjU4OGJiM2VlM2NiMTAwZjg1NzI4YyIsInVzZXJuYW1lIjoiam8iLCJpYXQiOjE2MjY3MTI1ODgsImV4cCI6MTYyNjcxNjE4OH0.bf_A9qfXNedVktiyaPWDOvstUsBkoSS6IONYHJXzq0k
