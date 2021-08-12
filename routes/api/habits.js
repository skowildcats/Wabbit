const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const Habit = require('./../../models/Habit')
const taskUtil = require('../util/tasks_util')
const User = require('./../../models/User')

//create habits
router.post('/new',async (req,res)=>{
  const habitOptions = {}
  for(field in req.body){
    habitOptions[field] = req.body[field]
  }
  const newHabit = new Habit(habitOptions)
  const userHabit = await newHabit.save()
  const user = await User.findById(userHabit.user)
  user.habits.push(userHabit._id)
  await user.save()
  if(taskUtil.appliesToday(newHabit)){
    const task = await taskUtil.createTaskFromHabit(newHabit)
    newHabit.task = task
  }
  res.json(newHabit)
})

//index all habits
router.get('/all/:userId', async (req,res)=>{
  const user = await User.findById(req.params.userId)

  const habits = await Promise.all(user.habits.map((id)=>Habit.findById(id)))
  res.json(habits)
})

//update habit
router.put('/:habitId',async (req,res)=>{
  const habit = await Habit.findById(req.params.habitId)
  for(field in req.body){
    habit[field] = req.body[field]
  }
  await habit.save()
  res.json(habit)
})

//delete habit
router.delete('/:habitId', async (req,res)=>{
  const habitId = req.params.habitId
  const habit = await Habit.findById(habitId)
  const userId = habit.user
  await User.findByIdAndUpdate(userId, {$pull: {habits: habit._id}})
  await Habit.deleteOne({_id: habitId})
  res.json({msg: 'deleted successfully success', habit})
})

//persistent order of tasks to backend
router.post('/order', async (req,res)=>{
  const habits = req.body.habits
  for(const [index, habit] of habits.entries()){
    const updateHabit = await Habit.findById(mongoose.Types.ObjectId(habit))
    updateHabit.index = index
    await updateHabit.save()
  }
  res.json({msg: 'order updated'})
})


module.exports = router