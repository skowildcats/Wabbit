import React, { useState, useEffect } from 'react'

export default function Metrics(props){
  useEffect(() => {
    props.fetchMetrics(props.userId)
  }, [])
  return (
    <div className="metrics-page">
      Metrics page
    </div>
  )
}