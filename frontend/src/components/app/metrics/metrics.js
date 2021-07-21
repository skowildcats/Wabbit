import React, { useState, useEffect } from 'react'

export default function Metrics(props){
  useEffect(() => {
    props.fetchMetrics(props.userId)
  }, [])
  return (
    <div className="metrics-page">
      <div className="header">
        This will feature data for a basic habit over the last week
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