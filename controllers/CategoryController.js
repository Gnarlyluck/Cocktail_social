const { request } = require('express')
const { categories } = require('../models')

const CreateCategory = async (req, res) => {
    try{
        let categoryDetails = {
            ...request.body
        }
        let newCategory = await categories.create(categoryDetails)
        res.send(newCategory)
    }catch(error){
        console.log('CreateCategory ERROR!!!')
    }
}

const GetCategory = async (req, res) => {
    try{
        let oneCategory = await categories.findByPk(req.params.categoryId)//questionable
        res.send(oneCategory) 
    }catch(error){
        console.log('GetCategory ERROR!!!')
    }
}

const GetAllCategories = async (req, res) => {
    try{
        let allCats = await categories.findAll()
        res.send(allCats)
    }catch(error){
        console.log('GetAllCategories ERROR!!!')
    }
}

const EditCategory = async (req, res) => {
    try{
        let categoryId = parseInt(req.params.categoryId)
        let updatedDeets = req.body
        let editedcat = await categories.update(updatedDeets, {
            where: {
                id: categoryId
            }
        })
        res.send(editedcat)
    }catch(error){
        console.log('EditCategory ERROR!!!')
    }
}

const DeleteCategory = async (req, res) => {
    try{
        let categoryId = parseInt(req.params.categoryId)
        await categories.destroy({
            where: {
                id: categoryId
            }
        })
        res.send({message: `Deleted that category with an id of ${categoryId}`})
    }catch(error){
        console.log('DeleteCategory ERROR!!!')
    }
}

module.exports = {
    CreateCategory,
    GetCategory,
    GetAllCategories,
    EditCategory,
    DeleteCategory,
}