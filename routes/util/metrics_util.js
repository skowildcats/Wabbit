const moment = require('moment');

exports.percentComplete = function(tasks,range){
  if(range){
    tasks = filterByStartDate(tasks,range)
  }
  const total = tasks.length
  let completed=0
  for(const task of tasks){
    if(task.completed){
      completed++
    }
  }
  if(total>0){
    return completed/total
  }
  return
}

exports.percentOnTime = function(tasks,range){
  if(range){
    tasks = filterByStartDate(tasks,range)
  }
  let total=0
  let completed=0
  for(const task of tasks){
    if(task.dueDate && task.completed){
      total++
      if(task.completed && task.completedAt<task.dueDate){
        completed++
      }
    }
  }
  if(total>0){
    return completed/total
  }
  return
}

exports.completedByWeekday = function(tasks,range = 7){
  if(range){
    tasks = filterByStartDate(tasks,range)
  }

  const week = {
    Monday: { completed: 0, unComplete: 0 },
    Tuesday: { completed: 0, unComplete: 0 },
    Wednesday: { completed: 0, unComplete: 0 },
    Thursday: { completed: 0, unComplete: 0 },
    Friday: { completed: 0, unComplete: 0 },
    Saturday: { completed: 0, unComplete: 0 },
    Sunday: { completed: 0, unComplete: 0 },
  }

  for(const task of tasks){
    if(task.completed){
      const dayCompleted = convertToDayString(task.completedAt)
      week[dayCompleted].completed++
    } else{
      let date = new Date();
      if(date > task.dueDate){ //due date has been passed
        const dayUncomplete = convertToDayString(task.dueDate)
        week[dayUncomplete].unComplete++
      }
    }
  }
  return week
}

function filterByStartDate(tasks,days){
  const now = new Date()
  const filteredResult = []
  for(task of tasks){
    const newDate = task.createdAt
    newDate.setDate(newDate.getDate()+days)
    if(newDate>now){
      filteredResult.push(task)
    }
  }
  return filteredResult
}

function convertToDayString(date){
  const newDate = new Date(date)
  const options = { weekday: 'long'};
  const res = new Intl.DateTimeFormat('en-US', options).format(newDate)
  return res
}

// exports.percentComplete = function(tasks){

// }

