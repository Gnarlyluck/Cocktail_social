import ApiClient from './ApiServices'

export const __GetOnePost = async(postId) => {
    try{
        const res = await ApiClient.get(`/post${postId}`)//id may be off
        return res.data
    }catch(error){
        console.log('__GetOnePost ERROR!!!')
        throw error
    }
}

export const __GetPosts = async() => {
    try{
        const res = await ApiClient.get('/post/all/posts')
        return res.data
    }catch(error){
        console.log('__GetPosts ERROR!!!')
        throw error
    }
}

export const __UpdatePost = async(post_id, formData) => {
    try{
        const res = await ApiClient.put(`/post/edit/${post_id}`)
    }catch(error){
        console.log('__UpdatePost ERROR!!!')
        throw error
    }
}
export const __UploadPost = async(formData) => {
    try{

    }catch(error){
        console.log('__UploadPost ERROR!!!')
        throw error
    }
}
export const __DeletePost = async(postId) => {
    try{

    }catch(error){
        console.log('__DeletePost ERROR!!!')
        throw error
    }
}

export const __GetPostsByUser = async(userId) => {
    try{

    }catch(error){
        console.log('__GetPostsByUser ERROR!!!')
        throw error
    }
}

