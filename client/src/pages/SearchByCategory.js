import React, {useState, useEffect} from 'react'
import CatCard from '../components/CatCard'
import {__GetAllCategories, __FindCategoryByName} from '../services/CategoryServices'
import {__GetAllPostsByCategory} from '../services/TagServices'

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'

const SearchByCategory = (props) => {
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
    console.log(categories)
    useEffect(() => {
        if (!categories) {
            getAllCategories()
        }
    }, [])
    console.log(postAttributes)
    return (
        
        <Grid style={{padding: '50px'}}>
            <Grid>
                <Autocomplete
                    id="combo-box"
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 225}}
                    renderInput={(params) => <TextField id='test'{...params} label="Category" variant="outlined" />}
                    onChange={(e) => {handleSubmit(e)}}
                    /> 
            </Grid>
            {!firstChoice ? noResults ? 
            <p style={{margin: '50px'}}>This category has no posts!</p>
            : 
            <Grid >
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