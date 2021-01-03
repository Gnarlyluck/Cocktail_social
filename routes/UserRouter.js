const Router = require('express').Router()
const controller = require('../controllers/UserController')
const {readToken, verifyJwt} = require('../middleware')


module.exports = Router