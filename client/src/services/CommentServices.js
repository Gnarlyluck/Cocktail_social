import ApiClient from './ApiServices'

export const __CreateComment = async(userId, drinkPostId, formData) => {
    try{
        const res = await ApiClient.post(
            `/comments/${userId}/drink_posts/${drinkPostId}`, formData)
            return res.data
    }catch(error){
        console.log('__CreateComment ERROR!!!!')
        throw error
    }
}

// export const __GetComments = async(drinkPostId) => {
//     try{

//     }catch(error){
//         console.log('__GetComments ERROR!!!!')
//         throw error
//     }
// }

export const __DeleteComment = async(commentId) => {
    try{
        const res = await ApiClient.delete(`/comments/${commentId}`)
        return res.date
    }catch(error){
        console.log('__DeleteComment ERROR!!!!')
        throw error
    }
}