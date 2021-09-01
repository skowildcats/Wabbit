import React, { useEffect, useState } from 'react'
import moment from 'moment'
import BarGraph from './bar_graph'
import LineGraph from './line_graph'
import PieChart from './pie_chart'
import Checkbox from './checkbox'
import { setupBarGraphData, setupLineGraphData, setupPieCount, setupPieComplete } from './metrics_util';
import Loader from '../home/loader'

export default function Metrics(props){
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    props.fetchMetrics(props.userId).then(data => {
      setLoading(false)
    })
  }, []);

  //this page probably will need a loading page later
  if (loading) return <div id="loading"><Loader /></div>;

  //grab start and end dates for this week for the habit bar
  let startOfWeek = moment().subtract(6, "days").format('MM/DD/YYYY')
  let endOfWeek = moment().format('MM/DD/YYYY')

  let progressTracker;
  //the idea is to take a single habit, will need to alter this later
  if(props.metrics.habit){
    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let currentDay = moment().format('dddd');
    currentDay = weekdays.indexOf(currentDay)
    //HEY A/A!!!
    progressTracker = weekdays.map((day, idx) => {
      return <Checkbox key={day} disabled={idx > currentDay ? true : false} day={day}/>
    })
  }
  
  const color1 = props.colors[6];
  const color2 = props.colors[3];

  return (
      <div className="metrics-page">
        <div className="header">
          <div className="this-week">{startOfWeek} – {endOfWeek}</div>
          {/* <div className="habit">
            <img src={`/api/files/image/${props.metrics.habit.icon}`} alt="Icon-placeholder" className="icon" />
            <p>{props.metrics ? props.metrics.habit.title : "Habit"}</p>
              <div className="checkboxes">
                {progressTracker}
              </div>
          </div> */}
        </div>

        {props.metrics.count > 0 ? 
        <>
          <div className="bar-graph">
            <p className="graph-title">Task Completion for this Week</p>
            <BarGraph color1={color1} color2={color2} data={setupBarGraphData(props.metrics.onTimeByWeekday, props.metrics.lateByWeekday)}/>
          </div>

          <div className="pie-chart">
            <p className="graph-title">Percentage of Tasks Completed</p>
            <PieChart color1={color1} color2={color2} data1={setupPieCount(props.metrics.count, props.metrics.percentOnTime)} data2={setupPieComplete(props.metrics.percentComplete)}/>
          </div>

          <div className="line-graph">
            <p className="graph-title">Lifetime Task Completions</p>
            <LineGraph color1={color1} color2={color2} data={setupLineGraphData(props.metrics.taskDonePerWeek)}/>
          </div>
        </>
        : 
        <>
        <div id="no-metrics">Finish some tasks to see more in depth data on task completions</div>
        <div className="line-graph">
            <p className="graph-title">Lifetime Task Completions</p>
            <LineGraph color1={color1} color2={color2} data={setupLineGraphData(props.metrics.taskDonePerWeek)}/>
        </div>
        </>}
      </div>
  )
}