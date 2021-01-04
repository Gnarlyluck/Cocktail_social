const { Comments, sequelize } = require('../models')

const CreateComment = async (req, res) => {
    try{
        const comment = await Comments.create({
            ...req.body,
            userId: req.params.user_id,//these references may wrong...
            drinkPostId: req.params.drink_posts_id
        })
        res.send(comment)
    }catch(error){
        console.log('CreateComment ERROR!!!')
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
}