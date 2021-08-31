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
//   .then(()=>console.log('Success'))
//   .catch(err => console.log(err));



// const seed = async()=>{
//   console.log('starting')
//   // generating users
//   const emails = ['demo@demo.com']
//   const firstNames = ['Demo']
//   const lastNames = ['User']
//   const themes = [["#808791", "#6C737C", "#5E6570", "#828079", "#C4B7A1", "#BFA49D", "#76848D", "#89664A", "#5D5449"]]
//   const newUser = new User({
//     email: emails[0],
//     password: 'password',
//     firstName: firstNames[0],
//     lastName: lastNames[0],
//     theme: themes[0]
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
//       // const colors = [
//       //   "#9c3838", // red
//       //   "#c28846", // dandelion
//       //   "#ebdf8a", // mustard yellow
//       //   "#91b58d", // pale green
//       //   "#62805e", // forest green
//       //   "#6883b3", // light blue
//       //   "#59667d", // dark blue
//       //   "#8b6f96", // lilac
//       //   "#b5b6bd", // blue-grey
//       //   "#525254"  // dark-blue-grey
//       // ];
//       const habitColors = [6, 3, 1];
//       const icons = ["general", "deadlines", "career", "studies", "personal", "health", "fitness", "errands"];
//       const habitIcons = ['health', 'fitness', 'personal'];

//       for(let i=0;i<habitTitle.length;i++){
//         const newHabit = new Habit({
//           title: habitTitle[i],
//           user: userId,
//           type: type[i],
//           recurrence: recurrence[i],
//           daysOfTheWeek: daysOfTheWeek[i],
//           color: habitColors[i],
//           icon: habitIcons[i],
//         })
//         let habit = await newHabit.save()
//         user.habits.push(habit._id)
//       }

//       //generating tasks
//       let taskTitle = ['Do Homework', 'Wash Dishes', 'Plan Trip', 'Attend a Japanese Tea Ceremony','Go to Sea World','Go to a Swingers Club','Buy a Watch','Jump Out of a Cake','Cook Christmas Dinner','Learn to Play Guitar','Sail Down the Yangtze River','Handwrite Letters','Jump Out a Plane Without a Parachute','Pour Water','Jump with Jack','Learn with Larry','Art with Abe','Jiggle Joseph','Put Out the BFBF','Run with Ryan','Tell Jom I Love Him','Reject Suzy Bae']
//       const today = new Date()
//       for(let i = 0;i < 120; i++){
//         const newTask = new Task({
//           title: taskTitle[_getRandomInt(taskTitle.length)],
//           user: userId,
//           dueDate: _pushBackDays(_getRandomInt(70),today),
//           completedAt: _pushBackDays(_getRandomInt(70),today),
//           completed: true,
//           type: 'task',
//           color: _getRandomInt(6) + 1,
//           icon: icons[_getRandomInt(icons.length)]
//         })
//         if(_getRandomInt(10)===3){
//           newTask.completed = false
//           delete newTask.completedAt
//         }
//         let task = await newTask.save()
//         user.tasks.push(task._id)
//       }
//       await user.save()
//       const tasks = user.tasks
//       for(let taskId of tasks){
//         const task = await Task.findById(taskId)
//         task.createdAt = _pushBackDays(70,today)
//         let result = await task.save()
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


// jo's seed file

// const User = require('./User')
// const Habit = require('./Habit')
// const Task = require('./Task')
// const taskUtil = require('../routes/util/tasks_util')
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
//   .then(()=>console.log('Success'))
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
      
//       const habitTitle = ['drink water','exercise', 'meditate'];
//       const description = ['8 cups of water a day', '50 pushups, 50 situps']
//       const recurrence = ['Daily', 'Daily', 'Weekly'];
//       const type = ['progress', 'task', 'timedGoal'];
//       const daysOfTheWeek = [null, null, 'MTWTF__'];
//       const increments = [1, null, null];
//       const goals = [8, null, null];
//       const seconds = [null, null, 1800];
//       const colors = [
//         "#9c3838", // red
//         "#c28846", // dandelion
//         "#ebdf8a", // mustard yellow
//         "#91b58d", // pale green
//         "#62805e", // forest green
//         "#6883b3", // light blue
//         "#59667d", // dark blue
//         "#8b6f96", // lilac
//         "#b5b6bd", // blue-grey
//         "#525254"  // dark-blue-grey
//       ];
//       const habitColors = [colors[6], colors[0], colors[1]]
//       const icons = ['health', 'fitness', 'personal'];

//       for(let i = 0; i < habitTitle.length; i++){
//         const newHabit = new Habit({
//           title: habitTitle[i],
//           user: userId,
//           description: description[i],
//           type: type[i],
//           recurrence: recurrence[i],
//           daysOfTheWeek: daysOfTheWeek[i],
//           increment: increments[i],
//           maxProgress: goals[i],
//           secondsLeft: seconds[i],
//           color: habitColors[i],
//           icon: icons[i]
//         });
//         const habit = await newHabit.save();
//         if(taskUtil.appliesToday(habit)){
//           const task = await taskUtil.createTaskFromHabit(habit);
//         }
//         user.habits.push(habit._id);
//       }

//       let taskTitle = ['Do Homework', 'Wash Dishes', 'Plan Trip', 'Attend a Japanese Tea Ceremony','Go to Sea World','Go to a Swingers Club','Buy a Watch','Jump Out of a Cake','Cook Christmas Dinner','Learn to Play Guitar','Sail Down the Yangtze River','Handwrite Letters','Jump Out a Plane Without a Parachute','Pour Water','Jump with Jack','Learn with Larry','Art with Abe','Put Out the BFBF','Run with Ryan','Tell Jom I Love Him','Reject Suzy Bae']
//       const today = new Date()
//       for(let i = 0;i < 120; i++){
//         const newTask = new Task({
//           title: taskTitle[_getRandomInt(taskTitle.length)],
//           user: userId,
//           dueDate: _pushBackDays(_getRandomInt(70),today),
//           completedAt: _pushBackDays(_getRandomInt(70),today),
//           completed: true,
//         })
//         if(_getRandomInt(10)===3){
//           newTask.completed = false
//           delete newTask.completedAt
//         }
//         let task = await newTask.save()
//         user.tasks.push(task._id)
//       }
//       await user.save()
//       // const tasks = await Task.find({user: userId})
//       const tasks = user.tasks
//       for(let taskId of tasks){
//         const task = await Task.findById(taskId)
//         task.createdAt = _pushBackDays(70,today)
//         let result = await task.save()
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