const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const DrinkPostRouter = require('./DrinkPostRouter')

const CommentRouter = require('./CommentRouter')
const CategoryRouter = require('./CategoryRouter')
const CatTagRouter = require('./CatTagRouter')

Router.use('/user', UserRouter)
Router.use('/post', DrinkPostRouter)
Router.use('/comment', CommentRouter)
Router.use('/category', CategoryRouter)
Router.use('/tag', CatTagRouter)
