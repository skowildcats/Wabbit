const express = require('express')
const router = express.Router()
const Task = require('../../models/Task')
const metricsUtil = require('../util/metrics_util')

router.get('/:userId',(req,res)=>{
  Task.find({user: req.params.userId})
    .then(tasks=>{
      res.json({
        percentComplete: metricsUtil.percentComplete(tasks),
        percentOnTime: metricsUtil.percentOnTime(tasks),
        completedByWeekday: metricsUtil.completedByWeekday(tasks)
      })
    })
    .catch(console.log)
})

module.exports = router
