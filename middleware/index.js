const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 12
const APP_SECRET = 'hsnslkd7443kn3ddjnfdslf894%$#FDSF@'

const hashPassword = async (password) => {
  /**
   * @param {password} => user submitted password
   */
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    // Hash the provided password and perform the hash by the amount of salt rounds
    return hashedPassword // return the hashed password
  } catch (error) {
    console.log("Error Hashing Password");
    throw error
  }
}

const passwordValid = async (submittedPassword, storedPassword) => {
  /**
   * @param {submittedPassword} => password sent in the login request
   * @param {storedPassword} => password_digest stored in the database
   */
  let valid = await bcrypt.compare(submittedPassword, storedPassword)
  // Compare the submitted password vs the stored password, if they compare correctly valid = true otherwise valid = false
  return valid
}

const readToken = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1]
  //   Read the request headers for an authorization field, the token format is as follows: Bearer sometokenishere
  //   We split the header at the space and get the token at index 1
  // THe authorization header must exist
  token ? (res.locals.token = token) : (res.locals.token = null)
  next()
}

const verifyJwt = (req, res, next) => {
  const { token } = res.locals // Get the token from response locals, res.locals allows us to pass information from function to function in the specific request path for the duration of the request
  let valid = jwt.verify(token, APP_SECRET) // We verify the token is valid and has not been tampered with and secure it with our secret key.
  if (valid) {
    // If it's valid we send it along to the next function in our route stack
    res.locals.token = valid
    return next()
  }
  res.status(401).send({ message: 'Unauthorized', status: 'Error' })
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET) // Create a token based on the payload and sign it with a secret key.
  return token // Return the token
}

module.exports = {
  hashPassword,
  readToken,
  verifyJwt,
  passwordValid,
  createToken
}
