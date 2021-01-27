const { hashPassword, passwordValid, createToken } = require('../middleware')
const { User } = require('../models')

const CreateUser = async (req, res) => {
    try{
        const { name, email, userName, password} = req.body
        const user_name = userName
        const password_digest = await hashPassword(password)
        const user = await User.create({ name, email, user_name, password_digest })
        res.send(user)
    }catch (error){
        throw error
    }
}

const GetUser = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.user_id)//fixed this works in insomnia
        res.send(user)
    }catch (error){
        throw error
    }
}

const LoginUser = async (req, res) => {
    try{
        const user = await User.findOne({
            where: { email: req.body.email },
            raw: true
        })
        if (user && passwordValid(req.body.password, user.password_digest)) {
            let payload = {
                id: user.id,
                userName: user.user_name,
            }
            let token = createToken(payload)
            return res.send({user, token})
        }
        return res.status(401).send({ message: 'Go on and get outta here, or try again...'})
    }catch (error){
        throw error
    }
}

const SessionStatus = async (req, res) => {
    try{
        const { token } = res.locals
        const user = await User.findByPk(token.id, {
            attributes: ['id', 'user_name', 'email']
        })
        res.send({ user, status: 'OK'})
    }catch (error) {
        res.status(401).send({message: 'invalid session'})
        throw error
    }
}

module.exports = {
    CreateUser,
    GetUser,
    LoginUser,
    SessionStatus,
}