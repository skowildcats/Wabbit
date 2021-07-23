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
    // M_TW_F__ for a mon tues wed fri repeating task
    type: String
  },
  type: {
    type: String
  },
  color: {
    type: String,
    // required: true
  },
  icon: {
    type: String, //this will just be the filename that can be used to fetch it from the api
    // required: true
  }
},{
  timestamps: true
})

module.exports = Habit = mongoose.model('Habit',HabitSchema)