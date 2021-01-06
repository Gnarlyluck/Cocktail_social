import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../components/card'
import {__GetPosts} from '../services/PostServices'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
 
export default () => {
    const classes = useStyles()

    const [picUrl, setPicUrl] = useState('')
    const [postId, setPostId] = useState('');
    const [titleText, setTitle] = useState('');
    const [descriptionText, setDescription] = useState('');
    const [recipeText, setRecipe] = useState('');
    
    const getAllPosts = async () => {
        try{
            const post = await __GetPosts()
            console.log(post)
            setPostId(post.id)
            setPicUrl(post.picture)
            setTitle(post.title)
            setDescription(post.description)
            setRecipe(post.recipe)
            return post
        }catch(error){
            // console.log('GetAllPosts ERROR!!!')
            throw error
        }
    }
    useEffect(() => {
    getAllPosts()
}, [])
//  map through array of posts and assign them to card
//return card for each element in array
// find the variable its stored in
// do that.map()
// and add a component
// to the return statement of the map
// INSIDE the html
// {post.map((post, index) => {
        return (
                <Card 
                    // {...post}
                    id={postId}
                    url={picUrl}
                    title={titleText}
                    description={descriptionText}
                    recipe={recipeText}
                    />
        )
        // }
    // )}
}  
