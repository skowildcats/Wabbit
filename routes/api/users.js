const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const validateRegisterInput = require('../../validations/register')
const validateLoginInput = require('../../validations/login')

//route for signing up
router.post('/register',async (req,res) => {
  //validate intput
  const{errors,isValid} = validateRegisterInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  //check for existing user under that email
  const user = await User.findOne({email: req.body.email})
  if(user) return res.status(400).json({email: 'email has already been taken'})
  
  //if not create a new user
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  //encrypt the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      const user = await newUser.save()
      res.json(user)
    })
  })
})

// route for updating password

router.put('/password',passport.authenticate('jwt', {session: false}),async (req,res)=>{

  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({email})
  // check if user exists
  if(!user){
    res.json({error: "user couldknt be found XD"})
  }
  //check that password is correct
  const isMatch = await bcrypt.compare(password, user.password)
  if(isMatch){
    bcrypt.genSalt(10,(err,salt) =>{
      bcrypt.hash(newPassword,salt,async (err,hash)=>{
        if (err) throw err
        user.password = hash
        await user.save()
        res.json(user)
      })
    })
  }else{
    res.json({error: 'Incorrect Password'})
  }
})

// route for updating name

router.put('/info', passport.authenticate('jwt', {session: false}), async (req,res)=>{
  const {email,firstName,lastName} = req.body
  const user = await User.findOne({email})

  user.firstName = firstName
  user.lastName = lastName
  
  await user.save()
  res.json(user)
})

//route for logging in
router.post('/login', async (req, res) => {

  const{errors, isValid} = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({email})
  if (!user) {
    return res.status(404).json({email: 'This user does not exist'});
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    const payload = {id: user.id, username: user.username}

    jwt.sign(payload, 
      keys.secretOrKey,
      {expiresIn: 3600},
      (err,token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token
        })
      })

  } else {
    return res.status(400).json({password: 'Incorrect password'});
  }
})

// //route for returning current user
// router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.json({
//     id: req.user.id,
//     username: req.user.username,
//     email: req.user.email
//   });
// })

module.exports = router