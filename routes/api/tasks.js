const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");
const taskUtil = require('../util/tasks_util')
const Habit = require('../../models/Habit')
const seed = require('../../models/seed')
const moment = require('moment')

// new task route
router.post("/new", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    user: req.body.user,
    description: req.body.description,
    dueDate: req.body.dueDate,
    color: req.body.color,
    icon: req.body.icon,
    goalTime: req.body.goalTime,
    increment: req.body.increment,
    counter: req.body.counter,
    countdown: req.body.countdown,
    maxProgress: req.body.maxProgress,
    type: req.body.type,
    currentProgress: req.body.currentProgress,
  });
  await newTask.save();
  res.json(newTask);
});

// update task route
router.put("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task.completed && req.body.completed) {
      task.completedAt = new Date();
    } else if (task.completed && !req.body.completed) {
      task.completedAt = null;
    }
    for (field in req.body) {
      task[field] = req.body[field];
    }
    await task.save();
    res.json(task);
  } catch (error) {
    console.log(error);
  }
});

// get a single task
router.get("/:taskId", async (req, res) => {
  try {
    task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (error) {
    console.log(error);
  }
});

// get all tasks
router.get("/all/:userId", async (req, res) => {
  //check if any habits need to build tasks for today
  const today = new Date()
  const lastChecked = new Date(process.env.LAST_CHECK)
  if(today.toDateString() !== lastChecked.toDateString()){
    process.env.LAST_CHECK = today
    refreshHabits(req.params.userId)
  }
  let filter = moment().subtract(1, 'weeks').toDate()
  tasks = await Task.find({ user: req.params.userId, dueDate: {$gt: filter}});
  res.json(tasks);
});

// delete a task
router.delete("/:taskId", async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.taskId });
    res.json({ msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});


async function refreshHabits(userId){
  const habits = await Habit.find({user: userId})
  for(habit of habits){
    if(taskUtil.appliesToday(habit)) taskUtil.createTaskFromHabit(habit)
  }
}



module.exports = router;

// user: 60f588bb3ee3cb100f85728c
// task1: 60f5aa5dbebcb620da43d32f
// task2: 60f5ab937372de2144b5f2d0
// token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjU4OGJiM2VlM2NiMTAwZjg1NzI4YyIsInVzZXJuYW1lIjoiam8iLCJpYXQiOjE2MjY3MTI1ODgsImV4cCI6MTYyNjcxNjE4OH0.bf_A9qfXNedVktiyaPWDOvstUsBkoSS6IONYHJXzq0k
