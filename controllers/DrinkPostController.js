const { drink_posts, sequelize } = require('../models')

const CreatePost = async (req, res) => {
    try{

    }catch(error){
        console.log('CreatePost ERROR!!!!')
        throw error
    }
}

const GetOnePost = async (req, res) => {
    try{

    }catch(error){
        console.log('GetOnePost ERROR!!!')
        throw error
    }
}

const  EditPost = async (req, res) => {
    try{

    }catch(error){
        console.log(' EditPost ERROR!!!')
        throw error
    }
}

const  DeletePost = async (req, res) => {
    try{

    }catch(error){
        console.log(' DeletePost ERROR!!!')
        throw error
    }
}


const GetPostByUser  = async (req, res) => {
    try{

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