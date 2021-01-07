import React, {useState, useEffect} from 'react';
import {  __UpdatePost, __GetOnePost} from '../services/PostServices'
import {__TagPostToCategory, __GetAllCategoriesOnPost, __RemoveTagFromPost, __GetTag} from '../services/TagServices'
import {__GetAllCategories, __FindCategoryByName, __GetCategory} from '../services/CategoryServices'

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const EditPost = (props) => {
    const classes = useStyles();

    const [picUrl, setPicUrl] = useState(null);
    const [formError, setFormError] = useState(false)
    const [titleText, setTitle] = useState('')
    const [descriptionText, setDescription] = useState('')
    const [recipeText, setRecipeText] = useState('')
    const [categories, setCategories] = useState(null)
    const [categoryChosen, setCategoryChosen] = useState(null)
    const [categoryChosenId, setCategoryChosenId] = useState(null)
    const [postId, setPostId] = useState(null)
    
    
    const getPost = async() => {
        try{
            let res = await __GetOnePost(props.match.params.post_id)
            setPicUrl(res.picture)
            setTitle(res.title)
            setDescription(res.description)
            setRecipeText(res.recipe)
            setPostId(res.id)
            let cat = await __GetAllCategoriesOnPost(props.match.params.post_id)
            if (cat.length < 1) {
                setCategoryChosenId(null)
            } else {
                setCategoryChosenId(cat[0].categories_id)
                ifCatExist(cat)
                let tagId = await __GetTag(res.id, cat[0].categories_id)
                await __RemoveTagFromPost(tagId.id)
            }
        }catch(error){
            console.log('GetPost ERROR!!')
            throw error
        }
    }
    
    const ifCatExist = async(arr) => {
        let catName = await __GetCategory(arr[0].category_id)
        setCategoryChosen(catName.name)
    }
    
    
    const getAllCategories = async() => {
        try {
            let res = await __GetAllCategories()
            setCategories(res)
        } catch (error) {
            throw error
        }
    }
  
    useEffect(() => {
        getAllCategories()
        getPost()
    })
    
    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            let updatedData = {
                user_id: props.currentUser.id,
                picture: picUrl,
                title: titleText,
                description: descriptionText,
                recipe: recipeText
            }
            let edit = await __UpdatePost(postId, updatedData)
            if(categoryChosen){
                let res = await __FindCategoryByName(categoryChosen)
                let input = {
                    categoryId: res.id,
                    postId: postId
                }
                await __TagPostToCategory(input)
            }
            props.history.push('/')
        }
        catch(error){
            setFormError(true)
            console.log('handleSubmit on editPost page ERROR!!')
            throw error
        }
    }
    const field = () => {
        if (categories) {
            return (<Autocomplete
                id="combo-box"
                options={categories}
                getOptionLabel={(option) => option.name}
                style={{ width: 230}}
                defaultValue={categories[categoryChosenId]}
                renderInput={(params) => <TextField id='test'{...params} label="Category" variant="outlined" />}
                onChange={(e) => setCategoryChosen(e.target.innerHTML)}
            /> )
        } 
        return (
            <Autocomplete
                id="combo-box"
                options={categories}
                getOptionLabel={(option) => option.name}
                style={{ width: 230}}
                renderInput={(params) => <TextField id='test'{...params} label="Category" variant="outlined" />}
                onChange={(e) => setCategoryChosen(e.target.innerHTML)}
            /> 
        )
    }

    return (
        <div style={{backgroundColor: 'white', padding: '50px', marginLeft: "500px", borderRadius:'20px'}} >
            <h1> Edit Post </h1>
            <div className="row">
                <form className="col s12" onSubmit={(e) => handleSubmit(e)}>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="title"
                            label="Title"
                            name="title"
                            value={titleText}
                            type="text"
                            variant="outlined"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div style={{margin: '10px'}}>
                        <p> Current Category: {categoryChosen} </p>
                        { field() }                  
                    </div>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="description"
                            label={"Description (250 max)"}
                            value={descriptionText}
                            multiline
                            rows={4}
                            style={{width: 230}}
                            type="text"
                            name="description"
                            maxLength={250}
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="recipe"
                            label={"Recipe (250 max)"}
                            value={recipeText}
                            multiline
                            rows={4}
                            style={{width: 230}}
                            type="text"
                            name="recipe"
                            maxLength={250}
                            variant="outlined"
                            onChange={(e) => setRecipeText(e.target.value)}
                        />
                    </div>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="url"
                            name="picture"
                            label="Url of Picture"
                            value={picUrl}
                            type="url"
                            variant="outlined"
                            onChange={(e) => setPicUrl(e.target.value)}
                        />
                    </div>
                    <Button type='submit' variant="outlined" size="medium" color="primary" className={classes.margin}>
                        Update Post
                    </Button>
                    {formError ? <p>Error While submitting</p> : <p></p>}
                </form>
            </div>   
        </div>
    )
}

export default EditPost