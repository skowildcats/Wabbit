const Task = require('../../models/Task')

exports.createTaskFromHabit = async function(habit){
  const newTask = new Task({
    title: habit.title,
    user: habit.user,
    description: habit.description,
    dueDate: habit.dueDate,
    color: habit.color,
    icon: habit.icon,
  });
  await newTask.save();
  return newTask
}

exports.appliesToday = function(habit){
  const now = new Date()
  switch (habit.recurrence) {
    case 'Daily':
      return true
    case 'Weekly':
      if(daysOfTheWeek[(now.getDay()+6)%7]==='_') return false
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
  if(date.getMonth() = newDate.getMonth()) return false
  return true
}