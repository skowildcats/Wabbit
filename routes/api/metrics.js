const express = require('express')
const router = express.Router()
const Task = require('../../models/Task')
const metricsUtil = require('../util/metrics_util')
const Habit = require('../../models/Habit')
const User = require('../../models/User')

router.get('/:userId',async (req,res)=>{
  try {
    const range = req.body.range||999
    const user = await User.findById(req.params.userId)
    let tasks = await Promise.all(user.tasks.map(id=>Task.findById(id)))
    tasks = metricsUtil.filterByStartDate(tasks,parseInt(range))
    const past10Weeks = metricsUtil.filterByStartDate(tasks,71)

    let count = await Task.countDocuments({user: req.params.userId, completed: true})
    let habit = await Habit.findOne({user: req.params.userId, recurrence: "Daily"});
    let habitTasks;
    if(habit){
        habitTasks = metricsUtil.filterByStartDate(
        await Task.find({habit: habit._id}),
        7
      );
    }
    res.json({
      taskDonePerWeek: metricsUtil.tasksDonePerWeek(past10Weeks),
      lateByWeekday: metricsUtil.lateByWeekday(tasks),
      onTimeByWeekday: metricsUtil.onTimeByWeekday(tasks),
      percentComplete: metricsUtil.percentComplete(tasks),
      percentOnTime: metricsUtil.percentOnTime(tasks),
      count: count,
      habit,
      habitTasks
    })
  } catch(error){
    console.log(error)
  }
})

module.exports = router
