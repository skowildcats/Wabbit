import React, { useEffect, useState } from 'react'
import moment from 'moment'
import BarGraph from './bar_graph'
import LineGraph from './line_graph'
import PieChart from './pie_chart'
import { setupBarGraphData, setupLineGraphData, setupPieCount, setupPieComplete } from './metrics_util';

export default function Metrics(props){
  window.moment = moment
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([props.fetchMetrics(props.userId), props.fetchHabits(props.userId), props.fetchTasks(props.userId)]).then(data => {
      setLoading(false)
    })
  }, []);
  let habitStyle = { //later we wll dynamically style the habits

  }
  if(loading) return null;
  let startOfWeek = moment().startOf('isoweek').format('MMM Do YYYY')
  let endOfWeek = moment().endOf('isoweek').format('MMM Do YYYY')

  console.log(props)
  let habit;
  let progressTracker;
  //the idea is to take a single habit, will need to alter this later
  if(props.habits){
    habit = props.habits[1];
    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let currentDay = moment().format('dddd');
    currentDay = weekdays.indexOf(currentDay)
    //HEY A/A!!!
    progressTracker = weekdays.map((day, idx) => {
      return <label key={day} className="toggle-button">
        <span>{day}</span>
        <input type="checkbox" disabled={idx > currentDay ? true : false}/>
        <div>
          <svg viewBox="0 0 44 44">
              <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
          </svg>
        </div>
      </label>
    })
  }
  return (
    <div className="metrics-page">
      <div className="header">
        <div className="this-week">Week of {startOfWeek} - {endOfWeek}</div>
        <div className="habit">
          <img src={`/api/files/image/${habit.icon}`} alt="Icon-placeholder" className="icon" />
          <p>{habit ? habit.title : "Habit"}</p>
            <div className="checkboxes">
              {progressTracker}
            </div>
        </div>
      </div>
      <div className="bar-graph">
        <p className="header">Task Completion for this Week</p>
        <BarGraph data={setupBarGraphData(props.metrics.onTimeByWeekday, props.metrics.lateByWeekday)}/>
      </div>

      <div className="pie-chart">
        <p className="header">Percentage of Tasks Completed</p>
        <PieChart data1={setupPieCount(props.metrics.count, props.metrics.percentOnTime)} data2={setupPieComplete(props.metrics.percentComplete)}/>
      </div>

      <div className="line-graph">
        <p className="header">Lifetime Task Completions</p>
        <LineGraph data={setupLineGraphData(props.metrics.taskDonePerWeek)}/>
      </div>
    </div>
  )
}