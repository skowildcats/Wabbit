const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')
const metrics = require('./routes/api/metrics')
const fileRouter = require('./routes/api/files')

require('./config/passport')(passport)
const methodOverride = require('method-override')

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!!"));

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

app.use(passport.initialize())

//Routes
app.use('/api/users', users)
app.use('/api/tasks',tasks)
app.use('/api/files', fileRouter)
app.use('/api/metrics',metrics)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));