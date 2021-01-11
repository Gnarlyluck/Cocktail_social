import ApiClient from './ApiServices'

export const __CreateComment = async( formData) => {
    try{
        const res = await ApiClient.post(
            `/comment/${formData.user_id}/drink_posts/${formData.drink_posts_id}`, {content:formData.content})
            return res.data
    }catch(error){
        console.log('__CreateComment ERROR!!!!')
        throw error
    }
}

export const __GetCommentsByPost = async(drinkPostId) => {
    try{
        const res = await ApiClient.get(`/view/${drinkPostId}`)
        return res.data
    }catch(error){
        console.log('__GetComments ERROR!!!!')
        throw error
    }
}
export const __GetComment = async(commentId) => {
    try{
        const res = await ApiClient.get(`comment/get/${commentId}`)
        return res.data
    }catch(error){
        console.log(error, '__GetComment ERROR!!!')
        throw error
    }
}
export const __EditComments = async(comment_id, formData) => {
    try{
        const res = await ApiClient.put(`/comment/edit/${comment_id}`, formData)
        return res.data
    }catch(error){
        throw error
    }
}
export const __DeleteComment = async(commentId) => {
    try{
        const res = await ApiClient.delete(`/comment/delete/${commentId}`)
        return res.data
    }catch(error){
        console.log('__DeleteComment ERROR!!!!')
        throw error
    }
}


