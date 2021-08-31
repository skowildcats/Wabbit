const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HabitSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String
  },
  recurrence: {
    // d,w,m for daily,weekly,biweekly,monthly,quarterly,yearly
    type: String
  },
  daysOfTheWeek:{
    // MTW_F__ for a mon tues wed fri repeating task
    type: String
  },
  type: {
    type: String
  },
  color: {
    type: Number,
    // required: true
  },
  icon: {
    type: String, //this will just be the filename that can be used to fetch it from the api
    // required: true
  },
  increment: {
    type: Number
  },
  maxProgress: {
    type: Number
  },
  secondsLeft: {
    type: Number
  },
  index: {
    type: Number
  },
  task: {
    
  }
},{
  timestamps: true
})

module.exports = Habit = mongoose.model('Habit',HabitSchema)