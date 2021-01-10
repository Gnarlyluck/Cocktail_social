const Router = require('express').Router()
const controller = require('../controllers/CommentController')

Router.post('/:user_id/drink_posts/:drink_posts_id', controller.CreateComment)//questionable
Router.delete('/delete/:comment_id', controller.DeleteComment)
Router.put('/edit/:comment_id', controller.EditComment)
// Router.get('/view/:post_id', controller.GetPostComments)
// Router.get('/get/:comment_id', controller.GetComment)
module.exports = Router 