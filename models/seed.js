const Habit = require('./Habit')
const Task = require('./Task')
const User = require('./User')


function drop(){
  const del1= Task.deleteMany({})
  const del2= Habit.deleteMany({})
  const del3= User.deleteMany({})
  Promise.all([del1,del2,del3])
}
async function seed(){

  // generating users
  const emails = ['demo@demo.com']
  const firstNames = ['Demo']
  const lastNames = ['User']
  for(let i = 0;i++;i<emails.length){
    const newUser = new User({
      email: email[i],
      password: 'password',
      firstName: firstNames[i],
      lastName: lastNames[i]
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        await newUser.save()
      })
    })
  }
  const userId = User.findOne({email: 'demo@demo.com'})._id

  // generating habits
  
  let habitTitle = ['Drink Water','Excercise', 'Meditate']
  const recurrence = ['Daily','Weekly','Daily']
  const daysOfTheWeek = [null,'M_W_F_S',null]

  for(let i = 0;i++;i<habitTitle.length){
    const newHabit = new Habit({
      title: habitTitle[i],
      user: userId,
      recurrence: recurrence[i],
      daysOfTheWeek: daysOfTheWeek[i]
    })
  }

  let taskTitle = ['do homework', 'wash dishes', 'plan trip', 'attend a japanese tea ceremony','go to sea world','go to a swingers club','buy a watch','jump out of a cake','cook christmas dinner','attend beard and mustache competition','try every ice cream','learn to play guitar','sail down the yangtze river','handwrite letters','jump out a plane without a parachute','pour water','jump with jack','learn with larry','art with abe','jiggle joseph','put out the BFBF','run with ryan','tell tom i love him','reject suzy']

  const today = new Date()

  for(let i = 0; i++;i<200){
    const newTask = new Task({
      title: taskTitle[_getRandomInt(taskTitle.length)],
      user: userId,
      dueDate: _pushBackDays(_getRandomInt(70),today),
      completedAt: _pushBackDays(_getRandomInt(70),today),
    })

    await newTask.save()
  }

  const tasks = await Task.find({user: userId})
  for(task of tasks){
    task.createdAt = _pushBackDays(70,today)
    await task.save()
  }
}


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

drop()
seed()