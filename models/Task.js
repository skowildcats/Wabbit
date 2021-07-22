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
    type: String,
    // required: true
  },
  icon: {
    type: String, //this will just be the filename that can be used to fetch it from the api
    // required: true
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: 'habits'
  }
},{
  timestamps: true
})

module.exports = Task = mongoose.model('Task', TaskSchema)
