import ApiClient from './ApiServices'

export const __GetOnePost = async(postId) => {
    try{
        const res = await ApiClient.get(`/post/${postId}`)//id may be off
        return res.data
    }catch(error){
        throw error
    }
}

export const __GetPosts = async() => {
    try{
        const res = await ApiClient.get('/post/all/posts')
        return res.data
    }catch(error){
        throw error
    }
}

export const __UpdatePost = async(post_id, formData) => {
    try{
        const res = await ApiClient.put(`/post/edit/${post_id}`, formData)
        return res.data
    }catch(error){
        throw error
    }
}
export const __UploadPost = async(formData) => {
    try{
        const res = await ApiClient.post(`/post/create`, formData)
        return res.data
    }catch(error){
        throw error
    }
}
export const __DeletePost = async(postId) => {
    try{
        const res = await ApiClient.delete(`post/delete/${postId}`)
        return res.data
    }catch(error){
        throw error
    }
}

export const __GetPostsByUser = async(userId) => {
    try{
        const res = await ApiClient.get(`/post/delete/${userId}`)
        return res.data
    }catch(error){
        throw error
    }
}

