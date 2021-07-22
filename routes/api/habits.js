const express = require('express')
const router = express.Router()
const Habit = require('./../../models/Habit')
const taskUtil = require('../util/tasks_util')

router.post('/new',async (req,res)=>{
  const habitOptions = {}
  for(field in req.body){
    habitOptions[field] = req.body[field]
  }
  const newHabit = new Habit(habitOptions)
  await newHabit.save()
  if(taskUtil.appliesToday(newHabit)){
    taskUtil.createTaskFromHabit(newHabit)
  }
  res.json(newHabit)
})

router.get('/all/:userId', async (req,res)=>{
  const habits = await Habit.find({user: req.params.userId})
  res.json(habits)
})

router.put('/:habitId',async (req,res)=>{
  const habit = await Habit.findById(req.params.habitId)
  for(field in req.body){
    habit[field] = req.body[field]
  }
  await habit.save()
  res.json(habit)
})

router.delete('/:habitId', async (req,res)=>{
  await Habit.deleteOne({_id: req.params.habitId})
  res.json({msg: 'success'})
})


module.exports = router