const { hashPassword, passwordValid, createToken } = require('../')
const { User, drink_posts } = require('../models')

const CreateUser = async (req, res) => {
    try{

    }catch (error){
        console.log('CreateUser ERROR!!!')
        throw error
    }
}

const GetUserProfile = async (req, res) => {
    try{

    }catch (error){
        console.log('GetUserProfile Error!!')
        throw error
    }
}

const LoginUser = async (req, res) => {
    try{

    }catch (error){
        console.log('LoginUser ERROR!!')
        throw error
    }
}

const SessionStatus = async (req, res) => {
    try{

    }catch (error) {
        console.log('SessionStatus ERROR!!!')
        throw error
    }
}

module.exports = {
    GetUserProfile,
    CreateUser,
    LoginUser,
    SessionStatus,
}