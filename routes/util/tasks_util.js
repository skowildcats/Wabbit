const Task = require('../../models/Task')
const User = require('../../models/User')

exports.createTaskFromHabit = async function(habit){
  const newTask = new Task({
    title: habit.title,
    user: habit.user,
    description: habit.description,
    dueDate: habit.dueDate,
    color: habit.color,
    icon: habit.icon,
    type: habit.type,
    increment: habit.increment,
    maxProgress: habit.maxProgress,
    secondsLeft: habit.secondsLeft
  });

  const task = await newTask.save();
  const user = await User.findById(habit.user)
  user.tasks.push(task._id)
  await user.save()
  return newTask
}

exports.appliesToday = function(habit){
  const now = new Date()
  switch (habit.recurrence) {
    case 'Daily':
      return true
    case 'Weekly':
      if(habit.daysOfTheWeek[(now.getDay()+6)%7]==='_') return false
      return true
    case 'Monthly':
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
  if(date.getMonth() === newDate.getMonth()) return false
  return true
}