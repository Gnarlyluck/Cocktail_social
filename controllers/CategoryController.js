const { Categories } = require('../models')

const CreateCategory = async (req, res) => {
    try{
        let categoryDetails = {
            ...req.body
        }
        let newCategory = await Categories.create(categoryDetails)
        res.send(newCategory)
    }catch(error){
        throw error
    }
}

const GetCategory = async (req, res) => {
    try{
        let oneCategory = await Categories.findByPk(req.params.categoryId)//questionable
        res.send(oneCategory) 
    }catch(error){
        throw error
    }
}

const GetAllCategories = async (req, res) => {
    try{
        let allCats = await Categories.findAll()
        res.send(allCats)
    }catch(error){
        throw error
    }
}

const EditCategory = async (req, res) => {
    try{
        let categoryId = parseInt(req.params.categoryId)
        let updatedDeets = req.body
        let editedcat = await Categories.update(updatedDeets, {
            where: {
                id: categoryId
            }
        })
        res.send(editedcat)
    }catch(error){
        throw error
    }
}

const DeleteCategory = async (req, res) => {
    try{
        let categoryId = parseInt(req.params.categoryId)
        await Categories.destroy({
            where: {
                id: categoryId
            }
        })
        res.send({message: `Deleted that category with an id of ${categoryId}`})
    }catch(error){
        throw error
    }
}

const GetCategoryIdByName = async (req, res) => {
    try {
        let categoryName = req.params.category_name
        let foundCategory = await Categories.findOne({
            where: {
                name: categoryName
            }
        })
        res.send(foundCategory)
    } catch(error) {
        throw error
    }
}

module.exports = {
    CreateCategory,
    GetCategory,
    GetAllCategories,
    EditCategory,
    DeleteCategory,
    GetCategoryIdByName
}