exports.percentComplete = function (tasks, range) {
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

exports.percentOnTime = function (tasks, range) {
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

exports.completedByWeekday = function (tasks, range) {
  const week = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  for (const task of tasks) {
    if (task.completed) {
      const dayCompleted = convertToDayString(task.completedAt);
      week[dayCompleted]++;
    }
  }
  return week;
};

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

function convertToDayString(date) {
  const newDate = new Date(date);
  const options = { weekday: "long" };
  const res = new Intl.DateTimeFormat("en-US", options).format(newDate);
  return res;
}

// exports.percentComplete = function(tasks){

// }
