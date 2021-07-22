const Task = require('../../models/Task')

exports.createTaskFromHabit = async function(habit){
  const newTask = new Task({
    title: req.body.title,
    user: req.body.user,
    description: req.body.description,
    dueDate: req.body.dueDate,
    color: req.body.color,
    icon: req.body.icon,
  });
  await newTask.save();
  return newTask
}