import ApiClient from './ApiServices'

export const __GetAllPostsByCategory = async(categoriesId) => {
    try{
        const res = await ApiClient.get(`/tag/posts/${categoriesId}`)
        return res.data
    }catch(error){
        console.log('__GetAllPostsByCategory ERROR!!!')
        throw error
    }
}

export const __GetAllCategoriesOnPost = async(drinkPostId) => {
    try{
        const res = await ApiClient.get(`/tag/catagories/${drinkPostId}`)
        return res.data
    }catch(error){
        console.log('__GetAllCategoriesOnPost ERROR!!!')
        throw error
    }
}

export const __TagPostToCategory = async(formData) => {
    try{
        const res = await ApiClient.post(`/tag/tagIt`, formData)
        return res.data
    }catch(error){
        console.log('__TagPostToCategory ERROR!!!')
        throw error

    }
}

export const __RemoveTagFromPost = async(tagId) => {
    try{
        const res = await ApiClient.delete(`/tag/untagIt/${tagId}`)
        return res.data
    }catch(error){
        console.log('__RemoveTagFromPost ERROR!!!')
        throw error
    }
}

export const __GetTag = async(drinkPostId, categoriesId) => {
    try{
        const res = await ApiClient.get(`/tag${categoriesId}/${drinkPostId}`)
        return res.data
    }catch(error){
        console.log('__GetTag ERROR!!!!')
        throw error
    }
}