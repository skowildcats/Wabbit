exports.percentComplete = function (tasks) {
  const total = tasks.length;
  let completed = 0;
  for (const task of tasks) {
    if (task.completed) {
      completed++;
    }
  }
  if (total > 0) {
    return completed / total;
  }
  return;
};


exports.percentOnTime = function (tasks) {
  let total = 0;
  let completed = 0;
  for (const task of tasks) {
    if (task.dueDate && task.completed) {
      total++;
      if (task.completed && task.completedAt < task.dueDate) {
        completed++;

      }
    }
  }
  if (total > 0) {
    return completed / total;
  }
  return;
};

exports.tasksDonePerWeek=(tasks)=>{
  const weeksChrono = [0,0,0,0,0,0,0,0,0,0]
  const now = new Date()
  const week = 7 * 24 * 60 *60*1000
  for(const task of tasks){
    if(!task.completed) continue
    const weeksElapsed = (now.getTime()-task.completedAt.getTime())/week
    // console.log(9-Math.floor(weeksElapsed))
    weeksChrono[9-Math.floor(weeksElapsed)]++
  }
  return weeksChrono
}

exports.onTimeByWeekday = function (tasks) {
  const monToSun = [0,0,0,0,0,0,0]

  for (const task of tasks) {
    if(!task.completed) continue
    if ((task.dueDate && task.completedAt<task.dueDate)||task.completed){
      monToSun[convertToMonSun(task.completedAt)]++
    }
  }
  return monToSun;
};

exports.lateByWeekday = function(tasks){
  const monToSun = [0,0,0,0,0,0,0]

  for(const task of tasks){
    if (task.dueDate && task.completed && task.dueDate<task.completedAt){
      monToSun[convertToMonSun(task.completedAt)]++
    }
  }
  return monToSun;
}


exports.filterByStartDate = function (tasks, days) {
  const now = new Date();
  const filteredResult = [];
  for (task of tasks) {
    const newDate = task.createdAt;
    newDate.setDate(newDate.getDate() + days);
    if (newDate > now) {
      filteredResult.push(task);
    }
  }
  return filteredResult;
};

function convertToMonSun(date){
  return (date.getDay()+6)%7
}

function convertToDayString(date) {
  const newDate = new Date(date);
  const options = { weekday: "long" };
  const res = new Intl.DateTimeFormat("en-US", options).format(newDate);
  return res;
}

