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
    if(task.dueDate){
      total++
      if(task.completedAt<task.dueDate){
        completed++
      }
    }
  }
  if(total>0){
    return completed/total
  }
  return
}

// exports.percentLate = function(tasks){

// }

// exports.percentComplete = function(tasks){

// }

