import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../components/DrinkCard'
import {__GetPosts} from '../services/PostServices'
import Grid from '@material-ui/core/Grid';


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
          <Grid 
          container 
          className={classes.root} 
          spacing={0} 
          justify="center" 
          style={{}}
          >
            {posts.map((post, index) => <Card
                    key={index} 
                    id={post.id}
                    url={post.picture}
                    title={post.title}
                    description={post.description}
                    recipe={post.recipe}
                    comments={post.Comments}
                    />)}
          </Grid>
        )
}  
export default HomePage