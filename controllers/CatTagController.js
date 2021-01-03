const { response } = require('express')
const { cat_tag, drink_posts, catagories } = require('../models')
const categories = require('../models/categories')

const TagPostToCategory = async (req, res) => {
    try{
        const drinkPostId = req.body.drinkPostId
        const categoriesId = req.body.categoriesId
        const post = await drink_posts.findByPk(drinkPostId)
        const category = await categories.findByPk(categoriesId)
        let newtag = await cat_tag.create({
            drink_post_id: parseInt(post.dataValues.id),
            drinkPostId: parseInt(post.dataValues.id),
            categories_id: parseInt(category.dataValues.id),
            categoriesId: parseInt(category.dataValues.id)
        })
        res.send(newtag)
    }catch(error){
        console.log('TagPostToCategory ERROR!!!')
        throw error
    }
}

const RemoveTagFromPost = async (req, res) => {
    try{
        let tagId = parseInt(req.params.cat_tag_id)//id questionable
        await cat_tag.destroy({
            where: {
                id:tagId
            }
        })
        res.send({message: `deleted that tag for you${tagId}`})
    }catch(error){
        console.log('TagPostToCategory ERROR!!!')
        throw error
    }
}

const GetAllPostsByCategory = async (req, res) => {
    try{
        let categoriesId = parseInt(req.params.categories_id)
        const allPostsInCategory = await cat_tag.findAll({
            where: {categories_id: categoriesId}
        })
        res.send(allPostsInCategory)
    }catch(error){
        console.log('GetAllPostsByCategory ERROR!!!')
        throw error
    }
}

const GetAllCategoriesOnPost = async (req, res) => {
    try{
        let postId = parseInt(req.params.drink_post_id)
        const allTagsOnPost = await cat_tag.findAll({
            where: {drink_post_id: postId}
        })
        response.send(allTagsOnPost)
    }catch(error){
        console.log('GetAllCategoriesOnPost ERROR!!!')
        throw error
    }
}

const GetTag = async (req, res) => {
    try{
        let postId = parseInt(req.params.drink_post_id)
        let categoriesId = parseInt(request.params.categories_id)
        let tagId = await cat_tag.findone({
            attributes: ['id'],
            where: {
                drink_post_id: postId,
                categories_id: categoriesId
            }
        })
        res.send(tagId)
    }catch(error){
        console.log('GetTag ERROR!!!')
        throw error
    }
}

module.exports = {
    TagPostToCategory,
    RemoveTagFromPost,
    GetAllPostsByCategory,
    GetAllCategoriesOnPost,
    GetTag
}