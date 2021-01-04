const Router = require('express').Router()
const controller = require('../controllers/CommentController')

Router.post('/:user_id/drink_posts/:drink_posts_id', controller.CreateComment)//questionable
Router.delete('/:comment_id', controller.DeleteComment)

module.exports = Router