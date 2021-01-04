const Router = require('express').Router()
const controller = require('../controllers/DrinkPostController')

Router.post('/create', controller.CreatePost)
Router.get('/:post_id', controller.GetOnePost)
Router.get('/user/:user_id', controller.GetPostByUser)

Router.put('/edit/:post_id', controller.EditPost)

Router.delete('/delete/:post_id', controller.DeletePost)

module.exports = Router