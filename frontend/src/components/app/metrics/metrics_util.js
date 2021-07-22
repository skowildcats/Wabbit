import moment from 'moment';

export function setupBarGraphData(completedArr, incompletedArr){
  if(!completedArr || ! incompletedArr) return undefined;
  let data = [];
  for(let i = 6; i >= 0; i--){
    let obj = {}
    obj["date"] = moment().subtract(i, 'days').format('MMM DD')
    obj["Completed"] = completedArr[i]
    obj["Incomplete"] = incompletedArr[i]
    data.push(obj)
  }
  return data;
}

export const setupLineGraphData = (tasksByWeek) => {
  if(!tasksByWeek) return undefined;
  let data = [];
  for(let i = 0; i <= 9; i++){
    let obj = {}
    obj["date"] = moment().subtract(9 - i, 'weeks').format('MMM DD')
    obj["Tasks Completed"] = tasksByWeek[i];
    data.push(obj);
  }
  return data;
}

export const setupPieCount = (count, percentOnTime) => {
  if(!count || !percentOnTime) return undefined;
  return [{ inTime: "Tasks On Time", value: Math.trunc(count * percentOnTime)},
   {inTime: "Late Tasks", value: Math.trunc(count * Math.abs(1 - percentOnTime))}]
}

export const setupPieComplete = (percentComplete) => {
  if(!percentComplete) return undefined;
  return [
    { portion: 'Percent Completed', value: Math.trunc(percentComplete * 100)},
    { portion: 'Percent Incomplete', value: 100 - Math.trunc(percentComplete * 100)}
  ]
}