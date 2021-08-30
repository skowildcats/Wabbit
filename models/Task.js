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
 
  dueDate: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  color: {
    type: Number,
    // required: true
  },
  icon: {
    type: String, //this will just be the filename that can be used to fetch it from the api
    // required: true
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: 'habits'
  },
  type: {
    type: String  //this 
    //Options - progress - countdown - timedGoal - task
  },
  increment: {
    type: Number
  },
  maxProgress: {
    type: Number
  },
  currentProgress: {
    type: Number,
    default: 0
  },
  secondsLeft: {
    type: Number
  },
  index: {
    type: Number
  }
},{
  timestamps: true
})

module.exports = Task = mongoose.model('Task', TaskSchema)
