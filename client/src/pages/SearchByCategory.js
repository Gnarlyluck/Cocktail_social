import React, {useState, useEffect} from 'react'
import CatCard from '../components/CatCard'
import {__GetAllCategories, __FindCategoryByName} from '../services/CategoryServices'
import {__GetAllPostsByCategory} from '../services/TagServices'
import { makeStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        flexGrow: 1,
      },
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

const SearchByCategory = (props) => {
    const classes = useStyles()

    const [categories, setCategories] = useState(null)
    const [categoryChosen, setCategoryChosen] = useState(null)
    const [noResults, setNoResults] = useState(true)
    const [firstChoice, setFirstChoice] = useState(true)
    const [postAttributes, setPostAttributes] = useState([])

    
    const getAllCategories = async() => {
        try {
            let res = await __GetAllCategories()
                setCategories(res)
        } catch (error) {
            throw error
        }
    }
    const handleSubmit = async(e) => {
        try {
            setFirstChoice(false)
                let category = await __FindCategoryByName(e.target.innerHTML)
            setCategoryChosen(category)
                let tags = await __GetAllPostsByCategory(category.id)
            if (tags.length === 0) {
                setNoResults(true)
            } else {
                setPostAttributes(tags)
                setNoResults(false)
            }
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        if (!categories) {
            getAllCategories()
        }
    }, [])
    return (
        
        <Grid 
            container 
            className={classes.root} 
            spacing={0} 
            justify="center" 
            style={{width: '45vw'}}>
                <Grid justify='center'>
                    <Autocomplete
                        id="combo-box"
                        label="Select Category" 
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 225}}
                        renderInput={(params) => <TextField id='test'{...params} label="Choose Category" variant="outlined" />}
                        onChange={(e) => {handleSubmit(e)}}
                        /> 
                </Grid>
                {!firstChoice ? noResults ? 
                <p >This category has no posts!</p>
                : 
                <Grid>
                    {postAttributes.DrinkPosts.map((post, index) => 
                        <CatCard 
                        key={index}
                        id={post.id}
                        url={post.picture}
                        title={post.title}
                        description={post.recipe}
                        recipe={post.recipe}
                        />)}
                </Grid>
            :
            <p > Search drinks by category!</p>}
        </Grid>
    )
}
export default SearchByCategory