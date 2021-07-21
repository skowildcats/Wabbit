import React, { useEffect } from 'react'
import moment from 'moment'

export default function Metrics(props){
  useEffect(() => {
    props.fetchMetrics(props.userId)
  }, [])
  
  let habitStyle = { //later we wll dynamically style the habits

  }
  let startOfWeek = moment().startOf('isoweek').format('MMM Do YYYY')
  let endOfWeek = moment().endOf('isoweek').format('MMM Do YYYY')
  return (
    <div className="metrics-page">
      <div className="header">
        <div className="this-week">Week of {startOfWeek} - {endOfWeek}</div>
        <div className="habit">
          <img src="" alt="" className="icon" />
          <p>Habit Name</p>
          <label className="toggle-button">
            <input type="checkbox" />
             <div>
              <svg viewBox="0 0 44 44">
                  <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
              </svg>
            </div>
          </label>
        </div>
      </div>
      <div className="bar-graph">
        This will have all data for the bar graph for all habits/tasks over the past 7 days
      </div>

      <div className="line-graph">
        This will track much longer term task data
      </div>
    </div>
  )
}