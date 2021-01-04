const Router = require('express').Router()
const controller = require('../controllers/UserController')
const {readToken, verifyJwt} = require('../middleware')

Router.get('/:user_id', controller.GetUser)
Router.post('/create', controller.CreateUser)
Router.post('/login', controller.LoginUser)
Router.get('/session', readToken, verifyJwt, controller.SessionStatus)

module.exports = Router