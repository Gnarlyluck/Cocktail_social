const { CatTag, DrinkPosts, Categories } = require('../models')

const TagPostToCategory = async (req, res) => {
    try{
        const drinkPostId = req.body.drinkPostId
        const categoriesId = req.body.categoriesId
        const post = await DrinkPosts.findByPk(drinkPostId)
        const category = await Categories.findByPk(categoriesId)
        let newTag = await CatTag.create({
            drinkPostId: parseInt(post.dataValues.id),
            // drinkPostId: parseInt(post.id),
            categoriesId: parseInt(category.dataValues.id),
            // categoriesId: parseInt(category.id)
        })
        res.send(newTag)
    }catch(error){
        console.log(error)
    }
}


const RemoveTagFromPost = async (req, res) => {
    try{
        let tagId = parseInt(req.params.cat_tag_id)//id questionable
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