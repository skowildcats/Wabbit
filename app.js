const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')
require('./config/passport')(passport)




mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize())
app.use('/api/users',users)
app.use('/api/tasks',tasks)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
