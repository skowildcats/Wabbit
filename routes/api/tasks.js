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
    secondsLeft: req.body.secondsLeft,
    increment: req.body.increment,
    counter: req.body.counter,
    countdown: req.body.countdown,
    maxProgress: req.body.maxProgress,
    type: req.body.type,
    currentProgress: req.body.currentProgress,
  });
  await newTask.save();
  const taskUser = await User.findById(newTask.user)
  taskUser.tasks.push(newTask)
  await taskUser.save()
  res.json(newTask);
});

// update task route
router.put("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    //changing completedAt when completed is toggled
    if (!task.completed && req.body.completed) {
      task.completedAt = new Date();
    } else if (task.completed && !req.body.completed) {
      task.completedAt = null;
    }
    //changing the endtime for timers when timer is unpaused
    
    //updating the rest of the fields
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

  //retrieve tasks from user
  const user = await User.findById(req.params.userId)
  const tasks = await Promise.all(user.tasks.map((id)=>Task.findById(id)))
  res.json(tasks.filter(task=>task));
});

// delete a task
router.delete("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
    const userId = task.user
    await User.findByIdAndUpdate(userId, {$pull: {tasks: task._id}});
    await Task.deleteOne({ _id: req.params.taskId });
    res.json({ msg: "deleted successfully", task});
  } catch (error) {
    console.log(error);
  }
});

//persist order of tasks to backend
router.post('/order', async (req,res)=>{
  const tasks = req.body.tasks
  for(const [index, task] of tasks.entries()){
    let id = task.slice(5)
    console.log(id)
    console.log(Task.findById(id))
    const updateTask = await Task.findById(id)
    console.log(updateTask)
    updateTask.index = index
    await updateTask.save()
  }
  res.json({msg: 'order updated'})
})


async function refreshHabits(userId){
  const habits = await Habit.find({user: userId})
  for(habit of habits){
    if(taskUtil.appliesToday(habit)) taskUtil.createTaskFromHabit(habit)
  }
}



module.exports = router;
