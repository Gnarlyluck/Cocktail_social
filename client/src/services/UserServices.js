import ApiClient from './ApiServices'

export const __LoginUser = async(userData) => {
    try{
        const res = await ApiClient.post('/user/login', userData)
        localStorage.setItem('token', res.data.token)
        return res
    }catch(error){
        console.log('__LoginUser ERROR!!!')
        throw error
    }
}

export const __CheckSession = async(token) => {
    try {
        const res = await ApiClient.get('/user/session', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res.data
    }catch(error){
        console.log('__CheckSession ERROR!!!')
        throw error
    }
}

export const __CreateUser = async(userData) => {
    try {
        const res = await ApiClient.post('/user/create', userData)
        return res.data
    }catch(error){
        console.log('__CreateUser ERROR!!!')
        throw error
    }
}

export const __GetUser = async(id) => {//abcd
    try{
        const res = ApiClient.get(`/user/get/${id}`)
        return res
    }catch(error){
        console.log('__GetUser ERROR!!!')
        throw error
    }
}