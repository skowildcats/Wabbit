// const Habit = require('./Habit')
// const Task = require('./Task')
// const User = require('./User')
// const bcrypt = require('bcryptjs')
// const mongoose = require('mongoose')
// const moment = require('moment');

// const db= "mongodb+srv://wabbits:QOFRIDVnt7d8ybb3@cluster0.c42bi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .then(()=>Task.deleteMany())
//   .then(()=>Habit.deleteMany())
//   .then(()=>User.deleteMany())
//   .then(()=>seed())
//   .catch(err => console.log(err));



// const seed = async()=>{
//   console.log('starting')
//   // generating users
//   const emails = ['demo@demo.com']
//   const firstNames = ['Demo']
//   const lastNames = ['User']
//   const newUser = new User({
//     email: emails[0],
//     password: 'password',
//     firstName: firstNames[0],
//     lastName: lastNames[0]
//   })
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password, salt, async (err, hash) => {
//       if (err) throw err;
//       newUser.password = hash;
//       const user = await newUser.save()
//       const userId = user._id
//       // generating habits
      
//       let habitTitle = ['Drink Water','Excercise', 'Meditate']
//       const recurrence = ['Daily','Weekly','Daily']
//       const type = ['progress', 'countdown', 'task'];
//       const daysOfTheWeek = [null,'M_W_F_S',null]

//       for(let i=0;i<habitTitle.length;i++){
//         const newHabit = new Habit({
//           title: habitTitle[i],
//           user: userId,
//           type: type[i],
//           recurrence: recurrence[i],
//           daysOfTheWeek: daysOfTheWeek[i]
//         })
//         await newHabit.save()
//       }

//       let taskTitle = ['Do Homework', 'Wash Dishes', 'Plan Trip', 'Attend a Japanese Tea Ceremony','Go to Sea World','Go to a Swingers Club','Buy a Watch','Jump Out of a Cake','Cook Christmas Dinner','Learn to Play Guitar','Sail Down the Yangtze River','Handwrite Letters','Jump Out a Plane Without a Parachute','Pour Water','Jump with Jack','Learn with Larry','Art with Abe','Jiggle Joseph','Put Out the BFBF','Run with Ryan','Tell Jom I Love Him','Reject Suzy Bae']
//       const today = new Date()
//       let endDate = moment().add(4, 'days').toDate()
//       for(let i = 0;i < 120; i++){
//         const newTask = new Task({
//           title: taskTitle[_getRandomInt(taskTitle.length)],
//           user: userId,
//           type: type[_getRandomInt(type.length)],
//           dueDate: _pushBackDays(_getRandomInt(70),endDate),
//           completedAt: _pushBackDays(_getRandomInt(70),today),
//           completed: true,
//           maxProgress: _getRandomInt(20),
//         })
//         if(_getRandomInt(10)===3){
//           newTask.completed = false
//           delete newTask.completedAt
//         }
//         let task = await newTask.save()
//         console.log(task)
//       }
//       const tasks = await Task.find({user: userId})
//       for(let task of tasks){
//         task.createdAt = _pushBackDays(70,today)
//         let result = await task.save()
//         console.log(result)
//       }
//       console.log('done')
//     })
//   })
// }


// helper functions
function _pushBackDays(numDays,date){
  const day = 24*60*60*1000
  date = new Date(date)
  date.setTime(date.getTime()-(day*numDays))
  return date
}


function _getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
