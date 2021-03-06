import moment from 'moment';

export function setupBarGraphData(completedArr, completedLateArr){
  if(!completedArr || ! completedLateArr) return undefined;
  let data = [];
  //completedArr/completeLateArr are arranged in monday-sunday order. rotating each array based on what day of the week today is.
  const dayOfTheWeek = moment().diff(moment([2021,7,8]),'days')%7
  completedArr = completedArr.slice(dayOfTheWeek).concat(completedArr.slice(0,dayOfTheWeek)).reverse()
  completedLateArr = completedLateArr.slice(dayOfTheWeek).concat(completedLateArr.slice(0,dayOfTheWeek)).reverse()
  

  for(let i = 6; i >= 0; i--){
    let obj = {}
    obj["date"] = moment().subtract(i, 'days').format('MMM DD')
    obj["On Time"] = completedArr[i]
    obj["Late"] = completedLateArr[i]
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

export const setupPieCount = (percentOnTime) => {
  return [
    { inTime: "Percent On Time", value: Math.trunc(percentOnTime*100)},
   {inTime: "Percent Late", value: Math.trunc((1 - percentOnTime)*100)}
  ]
}

export const setupPieComplete = (percentComplete) => {
  return [
    { portion: 'Percent Completed', value: Math.trunc(percentComplete * 100)},
    { portion: 'Percent Incomplete', value: 100 - Math.trunc(percentComplete * 100)}
  ]
}