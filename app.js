const express = require('express')
const app = express()
const db = require('./config/db')

const UserController = require('./user/UserController')

const COLLECTIONS = {
  users: '/users'
}

app.use(COLLECTIONS.users, UserController)

module.exports = app