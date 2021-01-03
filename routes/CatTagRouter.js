const router = require('express').Router()
const router = require('express').Router()
const { Router } = require('express').Router()
const controller = require('../controllers/CatTagController')

Router.post('/tagIt', controller.TagPostToCategory)

Router.get('/categories/:post_id', controller.GetAllCategoriesOnPost)
Router.get('/posts/:categories_id', controller.GetAllPostsByCategory)
Router.get('/:categories_id/:post_id', controller.GetTag)//post_id may need to be drink_post_id

Router.delete('/untagIt/:cat_tag_id', controller.RemoveTagFromPost)


module.exports = Router