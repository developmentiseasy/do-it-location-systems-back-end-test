const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

const USERS = {
  getUserById: '/:id',
}
const USER_EXCEPTIONS = {
  addingProblem: 'There was a problem adding the information to the database.',
  updateProblem: 'There was a problem updating the user.',
  findUser: 'There was a problem finding the users.',
  findById: 'There was a problem finding the user.',
  removeUser: 'There was a problem deleting the user.',
  nullUser: 'No user found.',
}

router.use(bodyParser.urlencoded({ extended: true }))
const User = require('./User')


router.post('/', (req, res) => {
  User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    },
    (err, user) => {
      if (err)
        return res.status(500).send(USER_EXCEPTIONS.addingProblem)
      res.status(200).send(user)
    },
  )
})

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      return res.status(500).send(USER_EXCEPTIONS.findUser)
    res.status(200).send(users)
  })
})

router.get(USERS.getUserById, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      return res.status(500).send(USER_EXCEPTIONS.findById)
    if (!user)
      return res.status(404).send(USER_EXCEPTIONS.nullUser)
    res.status(200).send(user)
  })
})

router.delete(USERS.getUserById, (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err)
      return res.status(500).send(USER_EXCEPTIONS.removeUser)
    if (!user)
      return res.status(404).send(USER_EXCEPTIONS.nullUser)
    res.status(200).send("User "+ user.userName +" was successfully deleted.")
  })
})

router.put(USERS.getUserById, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
    if (err)
      return res.status(500).send(USER_EXCEPTIONS.updateProblem)
    if (!user)
      return res.status(404).send(USER_EXCEPTIONS.nullUser)
    res.status(200).send(user)
  })
})

module.exports = router
