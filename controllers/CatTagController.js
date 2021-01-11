const { CatTag, DrinkPosts, Categories } = require('../models')

const TagPostToCategory = async (req, res) => {
    try{
        const drink_posts_id = req.body.drink_posts_id
        const categories_id = req.body.categories_id
        const post = await DrinkPosts.findByPk(drink_posts_id)
        const category = await Categories.findByPk(categories_id)
        let newTag = await CatTag.create({
            drink_posts_id: parseInt(post.dataValues.id),
            drinkPostId: parseInt(post.id),
            categories_id: parseInt(category.dataValues.id),
            categoriesId: parseInt(category.id)
        })
        res.send(newTag)
    }catch(error){
        console.log(error)
        throw error
    }
}


const RemoveTagFromPost = async (req, res) => {
    try{
        let tagId = parseInt(req.params.cat_tag_id)
        await CatTag.destroy({
            where: {
                id:tagId
            }
        })
        res.send({message: `deleted that tag for you ${tagId}`})
    }catch(error){
        console.log('TagPostToCategory ERROR!!!')
        throw error
    }
}

const GetAllPostsByCategory = async (req, res) => {
    try{
        let categoriesId = parseInt(req.params.categories_id)
        const allPostsInCategory = await Categories.findOne({
            where: {id: categoriesId},
            include: [DrinkPosts]
        })
        res.send(allPostsInCategory)
    }catch(error){
        console.log('GetAllPostsByCategory ERROR!!!')
        throw error
    }
}

const GetAllCategoriesOnPost = async (req, res) => {
    try{
        let drinkPostId = parseInt(req.params.drink_posts_id)
        const allTagsOnPost = await CatTag.findAll({
            where: {drink_posts_id: drinkPostId}
        })
        res.send(allTagsOnPost)
    }catch(error){
        console.log('GetAllCategoriesOnPost ERROR!!!')
        throw error
    }
}
const GetTag = async (req, res) => {
    try{
        let drinkPostsId = parseInt(req.params.drink_posts_id)
        let categoriesId = parseInt(req.params.categories_id)
        console.log(drinkPostsId, categoriesId)
        const tagId = await CatTag.findOne({
            attributes: ['id'],
            where: {
                drink_posts_id: drinkPostsId,
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