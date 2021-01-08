import React, {useState, useEffect} from 'react';
import { __UploadPost} from '../services/PostServices'
import {__TagPostToCategory} from '../services/TagServices'
import {__GetAllCategories, __FindCategoryByName} from '../services/CategoryServices'

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const CreatePost = (props) => {
      const classes = useStyles()
    const [picUrl, setPicUrl] = useState(null);
    // const [userId, setUserId] = useState('');
    const [formError, setFormError] = useState(false)
    const [titleText, setTitle] = useState('')
    const [descriptionText, setDescription] = useState('')
    const [recipeText, setRecipeText] = useState('')
    const [categories, setCategories] = useState(null)
    const [categoryChosen, setCategoryChosen] = useState(null)
    
    const getAllCategories = async() => {
        try{
            let res = await __GetAllCategories()
            setCategories(res)
        }catch(error){
            console.log('getAllCategories error')
        }
    }
        useEffect(() => {
            getAllCategories()
        }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            let submittedData = {
                user_id: props.currentUser.id,
                picture: picUrl,
                title: titleText,
                description: descriptionText,
                recipe: recipeText
            }
            let Upload = await __UploadPost(submittedData)
            if (categoryChosen){
                let res = await __FindCategoryByName(categoryChosen)//issue here!
                let input = {
                    categoriesId: res.id,
                    drinkPostId: Upload.id
                }
                await __TagPostToCategory(input)
            }
        }catch(error){
            setFormError(true)
            throw error
        }
    }
    return(
        <div style={{backgroundColor: 'white', padding: '50px', borderRadius:'20px', flexGrow: '1', textAlign: 'center'}} >
            <h1> Create Post </h1>
            <div className="row">
                <form className="col s12" onSubmit={(e) => handleSubmit(e)}>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="title"
                            label="Title"
                            type="text"
                            variant="outlined"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div style={{margin: '10px'}}>
                        <Autocomplete
                            id="combo-box"
                            label="Assign a category"
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 230}}
                            renderInput={(params) => <TextField id='test'{...params} label="Category" variant="outlined" />}
                            onChange={(e) => setCategoryChosen(e.target.innerText)}
                        /> 
                    </div>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="description"
                            label="Description"
                            multiline
                            rows={4}
                            style={{width: 230}}
                            type="text"
                            maxLength={250}
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="recipe"
                            label="Recipe"
                            multiline
                            rows={4}
                            style={{width: 230}}
                            type="text"
                            maxLength={250}
                            variant="outlined"
                            onChange={(e) => setRecipeText(e.target.value)}
                        />
                    </div>
                    <div style={{margin: '10px'}}>
                        <TextField
                            fullwidth='true'
                            id="url"
                            label="Url of Picture (250 max)"
                            type="url"
                            maxLength={250}
                            variant="outlined"
                            onChange={(e) => setPicUrl(e.target.value)}
                        />
                        
                    </div>
                    <Button 
                    type='submit' 
                    variant="outlined" 
                    size="medium" 
                    color="primary" 
                    className={classes.margin}>
                        Submit
                    </Button>
                    {formError ? <p>Error While submitting</p> : <p>Post Submitted</p>}
                </form>
            </div>   
        </div>
    )
}

export default CreatePost