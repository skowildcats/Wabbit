const express = require("express");
const app = express();
const db = require('./config/keys_dev').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')
const metrics = require('./routes/api/metrics')
const habits = require('./routes/api/habits')
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })  
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./config/passport')(passport)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize())

//Routes
app.use('/api/users', users)
app.use('/api/tasks',tasks)
app.use('/api/metrics',metrics)
app.use('/api/habits',habits)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

