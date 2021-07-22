const express = require('express')
const router = express.Router()
const Task = require('../../models/Task')
const metricsUtil = require('../util/metrics_util')

router.get('/:userId',async (req,res)=>{
  try {
    const range = req.body.range||999
    const tasks = metricsUtil.filterByStartDate(
      await Task.find({user: req.params.userId}),
      parseInt(range)
    )

    res.json({
      percentComplete: metricsUtil.percentComplete(tasks),
      percentOnTime: metricsUtil.percentOnTime(tasks),
      completedByWeekday: metricsUtil.completedByWeekday(tasks)
    })
  } catch(error){
    console.log(error)
  }
})

module.exports = router
