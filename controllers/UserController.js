const { response, request } = require('express')
const { hashPassword, passwordValid, createToken } = require('../middleware')
const { User, drink_posts } = require('../models')

const CreateUser = async (req, res) => {
    try{
        const { name, email, userName, password} = req.body
        const user_name = userName//this may be a problem
        const password_digest = await hashPassword(password)
        const user = await User.create({ name, email, user_name, password_digest })
        res.send(user)
    }catch (error){
        console.log('CreateUser ERROR!!!')
        throw error
    }
}

const GetUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.user_id)
        res.send(user)
    }catch (error){
        console.log('GetUser Error!!')
        throw error
    }
}

const LoginUser = async (req, res) => {
    try{
        const user = await User.findOne({
            where: { email: req.body.email },
            raw: true
        })
        if (user && (await passwordValid(req.body.password, user.password_digest))) {
            let payload = {
                _id: user.id,
                userName: user.user_name,//this may be an issue
            }
            let token = createToken(payload)
            return res.send({user, token})
        }
        console.log('PAYLOAD may be an issue because of username')
        return res.status(401).send({ message: 'Go on and get outta here, or try again...'})
    }catch (error){
        console.log('LoginUser ERROR!!')
        throw error
    }
}

const SessionStatus = async (req, res) => {
    try{
        const { token } = res.locals
        const user = await User.findByPk(token._id, {
            attributes: ['id', 'user_name', 'email']
        })
        res.send({ user, status: 'OK'})
    }catch (error) {
        res.status(401).send({message: 'invalid session'})
        console.log('SessionStatus ERROR!!!')
        throw error
    }
}

module.exports = {
    CreateUser,
    GetUser,
    LoginUser,
    SessionStatus,
}