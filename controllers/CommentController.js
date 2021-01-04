const { Comments, User } = require('../models')

const CreateComment = async (req, res) => {
    try{
        const comment = await Comments.create({
            ...req.body,
            userId: req.params.user_id,//these references may wrong...
            drinkPostId: req.params.drink_id
        })
        res.send(comment)
    }catch(error){
        console.log('CreateComment ERROR!!!')
    }
} 

const DeleteComment = async (req, res) => {
    try{
        await comments.destroy({
            where: {
                id: req.params.comment_id
            }
        })    
    }catch(error){
        console.log('DeleteComment ERROR!!!')
    }
} 

module.exports = {
    CreateComment,
    DeleteComment,
}