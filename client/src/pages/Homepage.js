import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../components/DrinkCard'
import {__GetPosts} from '../services/PostServices'
import SpacingGrid from '../components/SpcaingGrid'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const HomePage = () => {
    const classes = useStyles()
    
    const [posts, setPosts] = useState([])
    
    const getAllPosts = async () => {
      try{
        const apiPosts = await __GetPosts()
        setPosts(apiPosts)
      }catch(error){
        throw error
      }
    }
    useEffect(() => {
    getAllPosts()
}, [])

        return (
          // <SpacingGrid>

          <div >
            {posts.map((post, index) => <Card
                    key={index} 
                    id={post.id}
                    url={post.picture}
                    title={post.title}
                    description={post.description}
                    recipe={post.recipe}
                    // </SpacingGrid>
                    comments={post.Comments}
                    />)}
          </div>
        )
}  
export default HomePage