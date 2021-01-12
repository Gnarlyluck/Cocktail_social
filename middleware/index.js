const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 12
const APP_SECRET = 'hsnslkd7443kn3ddjnfdslf894%$#FDSF@'

const hashPassword = async (password) => {
  /**
   * @param {password} 
   */
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    return hashedPassword
  } catch (error) {
    console.log("Error Hashing Password");
    throw error
  }
}

const passwordValid = async (submittedPassword, storedPassword) => {
  /**
   * @param {submittedPassword} 
   * @param {storedPassword} 
   */
  let valid = await bcrypt.compare(submittedPassword, storedPassword)
  return valid
}

const readToken = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1]
 
  token ? (res.locals.token = token) : (res.locals.token = null)
  next()
}

const verifyJwt = (req, res, next) => {
  const { token } = res.locals 
  let valid = jwt.verify(token, APP_SECRET)
  if (valid) {
    res.locals.token = valid
    return next()
  }
  res.status(401).send({ message: 'Unauthorized', status: 'Error' })
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

module.exports = {
  hashPassword,
  readToken,
  verifyJwt,
  passwordValid,
  createToken
}
