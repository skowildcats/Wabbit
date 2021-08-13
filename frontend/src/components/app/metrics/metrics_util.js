import moment from 'moment';

export function setupBarGraphData(completedArr, completedLateArr){
  if(!completedArr || ! completedLateArr) return undefined;
  let data = [];
  //completedArr/completeLateArr are arranged in monday-sunday order. rotating each array based on what day of the week today is.
  

  for(let i = 6; i >= 0; i--){
    let obj = {}
    obj["date"] = moment().subtract(i, 'days').format('MMM DD')
    obj["On Time"] = completedArr[i]
    obj["Late"] = completedLateArr[i]
    console.log(i,obj.date)
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
  return [{ inTime: "On Time", value: Math.trunc(count * percentOnTime)},
   {inTime: "Late", value: Math.trunc(count * Math.abs(1 - percentOnTime))}]
}

export const setupPieComplete = (percentComplete) => {
  if(!percentComplete) return undefined;
  return [
    { portion: 'Percent Completed', value: Math.trunc(percentComplete * 100)},
    { portion: 'Percent Incomplete', value: 100 - Math.trunc(percentComplete * 100)}
  ]
}