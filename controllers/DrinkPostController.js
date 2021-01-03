const { response } = require('express')
const { drink_posts, sequelize } = require('../models')
const { use } = require('../routes/UserRouter')

const CreatePost = async (req, res) => {
    try{
        const body = req.body
        const post = await drink_posts.create(body)
        res.send(post)
    }catch(error){
        res.status(401).send({message: "That didn't seem to work"})
        console.log('CreatePost ERROR!!!!')
        throw error
    }
}

const GetOnePost = async (req, res) => {
    try{
        const unoPostoh = await drink_posts.findByPk(req.params.post_id)
        res.send(unoPostoh)
    }catch(error){
        console.log('GetOnePost ERROR!!!')
        throw error
    }
}

const  EditPost = async (req, res) => {
    try{
        let drinkPostId = parseInt(req.params.drink_post_id)//this could be an issue
        let postDetails = req.body
        let editedPost = await drink_posts.update(postDetails, {
            where: {id: drinkPostId}
        })
        res.send(editedPost)
    }catch(error){
        console.log(' EditPost ERROR!!!')
        throw error
    }
}

const  DeletePost = async (req, res) => {
    try{
        let postId = parseInt( req.params.drink_post_id)
        await drink_posts.destroy({
            where: {
                id: postId
            }
        })
        res.send({meassage: `Deleted post with an id of ${postId}`})
    }catch(error){
        console.log(' DeletePost ERROR!!!')
        throw error
    }
}


const GetPostByUser  = async (req, res) => {
    try{
        const userId = req.params.user_id//maybe
        const userPosts = await drink_posts.findAll({
            where: {User_id: userId}
        })
        res.send(userPosts)
    }catch(error){
        console.log(' GetPostByUser ERROR!!!')
        throw error
    }
}

module.exports = {
    CreatePost,
    GetOnePost,
    EditPost,
    GetPostByUser,
    DeletePost
}