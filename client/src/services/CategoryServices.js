import ApiClient from './ApiServices'

export const __CreateCategory = async(formData) => { 
    try{
        const res = await ApiClient.post('/category/create', formData)
        return res.data
    }catch(error){
        console.log('__CreateCategory ERROR!!!')
        throw error
    }
}

export const __GetCategory = async(categoryId) => {//questionable ID
    try{
        const res = await ApiClient.get(`/category/${categoryId}`)
        return res.data
    }catch(error){
        console.log('__GetCategory ERROR!!!!')
        throw error
    }
}

export const __GetAllCategories = async () => {
    try{
        const res = await ApiClient.get(`/category/all/categories`)
        return res.data
    }catch(error){
        console.log('__GetAllCategories ERROR!!!')
        throw error
    }
}

export const __EditCategories = async(formData, categoryId) => {
    try{
        const res = await ApiClient.put(`/category/edit/${categoryId}`, formData)
        return res.data
    }catch(error){
        console.log('__EditCategories ERROR!!!!')
        throw error
    }
}

export const __DeleteCategories = async(categoryId) => {
    try{
        const res = await ApiClient.delete(`/category/delete/${categoryId}`)
        return res.data
    }catch(error){
        console.log('__DeleteCategories ERROR!!!')
        throw error
    }
}

export const __FindCategoryByName = async(formData) => {
    try{
        const res = await ApiClient.get(`/category/findByName/${formData}`)
        console.log(res.data)
        return res.data
    }catch(error){
        console.log('__FindCategoryByName ERROR!!!')
        throw error
    }
}