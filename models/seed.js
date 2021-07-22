// const Habit = require('./Habit')
// const Task = require('./Task')
// const User = require('./User')
// const bcrypt = require('bcryptjs')
// const mongoose = require('mongoose')

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
//       const daysOfTheWeek = [null,'M_W_F_S',null]

//       for(let i=0;i<habitTitle.length;i++){
//         const newHabit = new Habit({
//           title: habitTitle[i],
//           user: userId,
//           recurrence: recurrence[i],
//           daysOfTheWeek: daysOfTheWeek[i]
//         })
//         await newHabit.save()
//       }

//       let taskTitle = ['do homework', 'wash dishes', 'plan trip', 'attend a japanese tea ceremony','go to sea world','go to a swingers club','buy a watch','jump out of a cake','cook christmas dinner','attend beard and mustache competition','try every ice cream','learn to play guitar','sail down the yangtze river','handwrite letters','jump out a plane without a parachute','pour water','jump with jack','learn with larry','art with abe','jiggle joseph','put out the BFBF','run with ryan','tell tom i love him','reject suzy']
//       const today = new Date()

//       for(let i = 0;i<200; i++){
//         const newTask = new Task({
//           title: taskTitle[_getRandomInt(taskTitle.length)],
//           user: userId,
//           dueDate: _pushBackDays(_getRandomInt(70),today),
//           completedAt: _pushBackDays(_getRandomInt(70),today),
//           completed: true
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


// // helper functions
// function _pushBackDays(numDays,date){
//   const day = 24*60*60*1000
//   date = new Date(date)
//   date.setTime(date.getTime()-(day*numDays))
//   return date
// }


// function _getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
