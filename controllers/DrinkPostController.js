const { Drink_posts, Comments, sequelize } = require('../models')

const CreatePost = async (req, res) => {
    try{
        const body = req.body
        const post = await Drink_posts.create(body)
        res.send(post)
    }catch(error){
        res.status(401).send({message: "That didn't seem to work"})
        console.log('CreatePost ERROR!!!!')
        throw error
    }
}

const GetOnePost = async (req, res) => {
    try{
        const unoPostoh = await Drink_posts.findByPk(req.params.post_id)
        res.send(unoPostoh)
    }catch(error){
        console.log('GetOnePost ERROR!!!')
        throw error
    }
}

const GetAllPosts = async (req, res) => {
    try {
        const allPosts = await Drink_posts.findAll({
        include: [{ model: Comments, attributes: ["content"] }]
    })
        res.send(allPosts)
    } catch(error) {
        console.log('GetAllPosts error!!!!!')
        throw error
    }
}

const  EditPost = async (req, res) => {
    try{
        let drinkPostId = parseInt(req.params.post_id)
        let postDetails = req.body
        let editedPost = await Drink_posts.update(postDetails, {
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
        let postId = parseInt( req.params.post_id)
        await Drink_posts.destroy({
            where: {
                id: postId
            }
        })
        res.send({message: `Deleted post with an id of ${postId}`})
    }catch(error){
        console.log(' DeletePost ERROR!!!')
        throw error
    }
}


const GetPostByUser  = async (req, res) => {
    try{
        const userId = req.params.user_id
        const userPosts = await Drink_posts.findAll({
            where: {user_id: userId}
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
    DeletePost,
    GetAllPosts
}