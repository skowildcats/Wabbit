import React, { useState, useEffect } from 'react'
import moment from 'moment'

export default function Metrics(props){
  useEffect(() => {
    props.fetchMetrics(props.userId)
  }, [])
  
  let startOfWeek = moment().startOf('isoweek').format('MMM Do YYYY')
  let endOfWeek = moment().endOf('isoweek').format('MMM Do YYYY')
  return (
    <div className="metrics-page">
      <div className="header">
        <div className="this-week">Week of {startOfWeek} - {endOfWeek}</div>
        <div className="habit">
          
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