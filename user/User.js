const mongoose = require('mongoose')

const UserSchema = ({
  userName: String,
  email: String,
  password: String,
})

mongoose.model('User', UserSchema)
module.exports = mongoose.model('User')