//https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
const app = require('express')()
const AppRouter = require('./routes/AppRouter')
const express = require('express')
// const app = express()
const PORT = process.env.PORT || 3001

const path = require('path')

const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')

app.use(logger('dev'))
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.disable("X-Powered-By");


app.use('/api', AppRouter)
app.get('/', (req, res) => res.send({ message: 'Server Running', status: 'OK' }))
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
)

app.listen(PORT, () => console.log(`Server Listening On Port: ${PORT}`))
