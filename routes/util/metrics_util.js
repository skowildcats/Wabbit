exports.percentComplete = function(tasks){
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

exports.percentOnTime = function(tasks){
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

exports.completedByWeekday = function(tasks){
  const week = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  }

  for(const task of tasks){
    // debugger
    if(task.completed){
      const dayCompleted = convertToDayString(task.completedAt)
      week[dayCompleted]++
    }
  }
  return week
}


function convertToDayString(date){
  const newDate = new Date(date)
  const options = { weekday: 'long'};
  // debugger
  const res = new Intl.DateTimeFormat('en-US', options).format(newDate)
  return res
}

// exports.percentComplete = function(tasks){

// }

