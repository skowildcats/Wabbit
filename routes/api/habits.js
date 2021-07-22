const express = require('express')
const router = express.Router()
const Habit = require('./../../models/Habit')

router.post('/new',async (req,res)=>{
  const newHabit = {}
  for(field in req.body){
    newHabit[field] = req.body[field]
  }
})

module.exports = router