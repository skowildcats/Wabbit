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

      // sign in user after signup
      const payload = {id: user._id, username: user.username}
      jwt.sign(payload, 
        keys.secretOrKey,
        {expiresIn: 3600},
        (err,token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id,
            theme: user.theme,
            walkthrough: user.walkthrough
          })
        })
    })
  })
})

// route for updating password

router.put('/password',passport.authenticate('jwt', {session: false}),async (req,res)=>{

  const {email,oldPassword,newPassword,confirmPassword} = req.body

  // check if user exists
  const user = await User.findOne({email})
  if(!user) return res.status(400).json({error: "user couldknt be found XD"})

  //check that password is correct
  const isMatch = await bcrypt.compare(oldPassword, user.password)
  if(!isMatch) return res.status(400).json({error: 'Incorrect Password'})

  //check that confirmPW matches newPW
  if(newPassword!==confirmPassword) return res.status(400).json({error: "Passwords do not match"})

  bcrypt.genSalt(10,(err,salt) =>{
    bcrypt.hash(newPassword,salt,async (err,hash)=>{
      if (err) throw err
      user.password = hash
      await user.save()
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id,
        theme: user.theme,
        walkthrough: user.walkthrough
      })
    })
  })

})
//route for updating theme
router.put('/theme', passport.authenticate('jwt',{session: false}), async (req,res)=>{
  const {id,theme} = req.body
  const user = await User.findOne({_id: id})
  user.theme = theme
  await user.save()
  res.json({
    theme: user.theme
  })
})

// route for updating user information

router.put('/info', passport.authenticate('jwt', {session: false}), async (req,res)=>{
  const {firstName,lastName,email,id,theme,walkthrough,password} = req.body
  const user = await User.findOne({_id: id})
  user.firstName = firstName
  user.lastName = lastName
  user.email = email

  //check that password is correct
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) return res.status(400).json({error: 'Incorrect Password'})

  await user.save()
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user._id,
    theme,
    walkthrough
  })
})

//route for logging in
router.post('/login', async (req, res) => {

  const{errors, isValid} = validateLoginInput(req.body)
  if(!isValid) return res.status(400).json(errors)

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({email})
  if (!user) return res.status(404).json({email: 'This user does not exist'})

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({password: 'Incorrect password'})

  const payload = {id: user.id, username: user.username, theme: user.theme, walkthrough: user.walkthrough}
  jwt.sign(payload, 
    keys.secretOrKey,
    {expiresIn: 3600},
    (err,token) => {
      res.json({
        success: true,
        token: 'Bearer ' + token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id,
        theme: user.theme,
        walkthrough: user.walkthrough
      })
    })
})

//route for getting current user information
router.get('/:userId',async(req,res)=>{
  const user = await User.findById(req.params.userId)
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user._id,
    theme: user.theme,
    walkthrough: user.walkthrough
  })
})



module.exports = router