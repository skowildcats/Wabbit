const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  completed: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  recurrence: {
    // d,w,b,m,q,y for daily,weekly,biweekly,monthly,quarterly,yearly
    type: String
  },
  startDate:{
    type: Date,
    default: Date.now
  },
  daysOfTheWeek:{
    // M_TW_F__ for a mon tues wed fri repeating task
    type: String
  },
  dueDate: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String, //this will just be the filename that can be used to fetch it from the api
    required: true
  },
  subtasks: {
    type: Schema.Types.ObjectId,
    ref: 'tasks'
  }
},{
  timestamps: true
})

module.exports = Task = mongoose.model('Task', TaskSchema)
