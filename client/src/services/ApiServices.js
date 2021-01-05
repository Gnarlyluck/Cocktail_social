import axios from 'axios'
require('dotenv').config()

const ApiClient = axios.create({
    baseURL: 'http://localhost:3001/api'
})

export default ApiClient