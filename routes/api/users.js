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
router.post('/register', (req,res) => {

  const{errors,isValid} = validateRegisterInput(req.body)
  if(!isValid){
    return res.status(400).json(errors)
  }

  User.findOne({email: req.body.email})
    .then(user=>{
      if(user){
        return res.status(400).json({email: 'email has already been taken'})
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// route for updating password

router.put('/password',passport.authenticate('jwt', {session: false}),(req,res)=>{

  const email = req.body.email
  const password = req.body.password

  User.findOne({email})
    .then(user=>{
      // check if user exists
      if(!user){
        res.json({error: "user couldknt be found XD"})
      }
      //check that password is correct
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch){
            bcrypt.genSalt(10,(err,salt) =>{
              bcrypt.hash(newPassword,salt,(err,hash)=>{
                if (err) throw err
                user.password = hash
                user.save()
                  .then(user => res.json(user))
                  .catch(err => res.json({errors: err}))
              })
            })
          }else{
            res.json({error: 'Incorrect Password'})
          }
        })
    })
})

// route for updating name

router.put('/info', passport.authenticate('jwt', {session: false}), (req,res)=>{
  const {email,firstName,lastName} = req.body

  User.findOne({email})
    .then(user=>{
      user.firstName = firstName
      user.lastName = lastName
      user.save()
        .then(res.json(user))
        .catch(console.log)
    })
})

//route for logging in
router.post('/login', (req, res) => {

  const{errors, isValid} = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({email: 'This user does not exist'});
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // res.json({msg: 'Success'});
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
    })
})

//route for returning current user
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
})

module.exports = router