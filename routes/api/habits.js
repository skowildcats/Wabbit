const express = require('express')
const router = express.Router()
const Habit = require('./../../models/Habit')
const TaskUtil = require('../util/tasks_util')

router.post('/new',async (req,res)=>{
  const newHabit = {}
  for(field in req.body){
    newHabit[field] = req.body[field]
  }
  await newHabit.save()
  if(appliesToday(newHabit))
  res.json(newHabit)
})

function appliesToday(habit){
  const now = new Date()
  switch (habit.recurrence) {
    case 'd':
      return true
    case 'w':
      if(daysOfTheWeek[(now.getDay()+6)%7]==='_') return false
      return true
    case 'm':
      if(lastDayOfMonth(now) && 
        now.getDate()<habit.createdAt.getDate()){
          return true
      }
      return now.getDate() === habit.createdAt.getDate()
  }
}

function lastDayOfMonth(date){
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate()+1)
  if(date.getMonth() = newDate.getMonth()) return false
  return true
}



module.exports = router