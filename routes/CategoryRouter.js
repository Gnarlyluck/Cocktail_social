const Router = require('express').Router()
const controller = require('../controllers/CategoryController')

Router.post('/create', controller.CreateCategory)
Router.get('/:categoryId', controller.GetCategory)
Router.get('/all/categories', controller.GetAllCategories)
Router.put('/edit/:categoryId', controller.EditCategory)
Router.delete('/delete/:categoryId', controller.DeleteCategory)

module.exports = Router