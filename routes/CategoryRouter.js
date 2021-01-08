const Router = require('express').Router()
const controller = require('../controllers/CategoryController')

Router.post('/create', controller.CreateCategory)
Router.get('/:categoryId', controller.GetCategory)
Router.get('/all/categories', controller.GetAllCategories)
Router.get('/findByName/:category_name', controller.GetCategoryIdByName)
Router.put('/edit/:categoryId', controller.EditCategory)
Router.delete('/delete/:categoryId', controller.DeleteCategory)

module.exports = Router

// SELECT "id" FROM "cat_tags" AS "Cat_tag" WHERE "Cat_tag"."drink_posts_id" = 2 AND "Cat_tag"."categories_id" = NaN LIMIT 1;
// GetTag ERROR!!!