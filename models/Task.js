const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    recurrence: {
        type: String, //my current idea for recurrence is a string "MWF", "WEEKLY", "MTWRFSU"
        //or something of this nature
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    subtasks: {
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }
})

module.exports = Task = mongoose.model('task', TaskSchema)