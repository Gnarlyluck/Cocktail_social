const { Comments, User, sequelize } = require('../models')

const CreateComment = async (req, res) => {
    try{
        const comment = await Comments.create({
            ...req.body,
            userId: req.params.user_id,
            drinkPostId: req.params.drink_posts_id
        })
        res.send(comment)
    }catch(error){
        console.log(error)
    }
} 

const GetCreateComments = async(req, res) => {
    try{
        const comment = await Comments.findAll({
            where: {drink_posts_id: req.params.drink_posts_id},
            include:[{ model: User, attributes: ['user_name']}]
        })
        res.send(comment)
    }catch(error){
        console.log('GetCreateComments ERROR!!!')
        throw error
    }
}
const GetComments = async(req, res) => {
    try{
        const comment = await Comments.findAll({
            drinkPostsId: req.params.drink_posts_id
        })
        res.send(comment)
    }catch(error){
        console.log('GetComments ERROR!!!')
        throw error
    }
}

const DeleteComment = async (req, res) => {
    try{
        let commentId = parseInt(req.params.comment_id)
        await Comments.destroy({
            where: {
                id: commentId
            }
        })    
        res.send({message: `Deleted comment with an id of ${commentId}`})
    }catch(error){
        console.log('DeleteComment ERROR!!!')
    }
} 

module.exports = {
    CreateComment,
    DeleteComment,
    GetComments,
    GetCreateComments
}