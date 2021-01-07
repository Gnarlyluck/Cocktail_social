const { Cat_tag, Drink_posts, Categories } = require('../models')

const TagPostToCategory = async (req, res) => {
    try{
        const drinkPostId = req.body.drinkPostId
        const categoriesId = req.body.categoriesId
        console.log(drinkPostId, 'DrinkPostlog')
        const post = await Drink_posts.findByPk(drinkPostId)
        console.log(post, 'POST LOG!!')
        const category = await Categories.findByPk(categoriesId)
        let newTag = await Cat_tag.create({
            drink_posts_id: parseInt(post.dataValues.id),
            drinkPostId: parseInt(post.dataValues.id),
            categories_id: parseInt(category.dataValues.id),
            categoriesId: parseInt(category.dataValues.id)
        })
        res.send(newTag)
    }catch(error){
        console.log('TagPostToCategory ERROR!!!')
        throw error
    }
}
// need to insert cat Id and post id when creating for tag to work otherwise
//it throws an error and tag value is null

const RemoveTagFromPost = async (req, res) => {
    try{
        let tagId = parseInt(req.params.cat_tag_id)//id questionable
        await Cat_tag.destroy({
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
        const allPostsInCategory = await Cat_tag.findAll({
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
        let drinkPostId = parseInt(req.params.drink_posts_id)
        const allTagsOnPost = await Cat_tag.findAll({
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
        const tagId = await Cat_tag.findOne({
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
// console.log(GetTag())

module.exports = {
    TagPostToCategory,
    RemoveTagFromPost,
    GetAllPostsByCategory,
    GetAllCategoriesOnPost,
    GetTag
}