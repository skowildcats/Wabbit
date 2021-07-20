const express = require('express')
const router = express.Router()
const Task = require('../../models/Task')
const User = require('../../models/User')

router.get('/:userId',(req,res)=>{
  Task.find({user: req.params.userId})
    .then(tasks=>{
      //finding percent of all tasks completed
      const total = tasks.length
      let numOfCompletedTasks=0
      let countDoneOnTime = 0
      let numOfTasksWithDeadline = 0
      for(const task of tasks){
        if(task.completed){
          numOfCompletedTasks++
        }

        // count tasks done before deadline but we need to find a way to pass completedAt date
        if(task.dueDate){
          numOfTasksWithDeadline++
          if(task.completedAt<task.dueDate){
            countDoneOnTime++
          }
        }
      }
      let result = {percentCompleted: numOfCompletedTasks/total}
      if(numOfTasksWithDeadline>0){
        result.doneOnTime = countDoneOnTime/numOfTasksWithDeadline
      }
      
      res.json(result)
    })
    .catch(err=>res.json({errors: err}))
})

module.exports = router
