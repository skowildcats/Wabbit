const express = require('express')
const router = express.Router()
const Task = require('../../models/Task')
const metricsUtil = require('../util/metrics_util')

router.get('/:userId',async (req,res)=>{
  try {
    const tasks = await Task.find({user: req.params.userId})
    const range = req.body.range||999

    res.json({
      percentComplete: metricsUtil.percentComplete(tasks,range),
      percentOnTime: metricsUtil.percentOnTime(tasks,range),
      completedByWeekday: metricsUtil.completedByWeekday(tasks,range)
    })
  } catch(error){
    console.log(error)
  }
})

module.exports = router
