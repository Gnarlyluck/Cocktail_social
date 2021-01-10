import React, {useState, useEffect} from 'react'
import { __GetPosts } from '../services/PostServices'
import { __GetCommentsByPost } from '../services/CommentServices';
import DrinkCard from '../components/DrinkCard'

import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

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
  const Profile = (props) => {
    
    const classes = useStyles()
    
    const [posts, setPosts] = useState([])
    
    const getAllPosts = async(e) => {
      try{
        const apiPosts = await __GetPosts()
        setPosts(apiPosts)
      }
      catch(error){
        throw error
      }
    }
    useEffect(() => {
      getAllPosts()
    }, [])
        return(
          <Grid 
          container 
          className={classes.root} 
          spacing={1} 
          justify="center" 
          style={{}}
          >
            {posts.map((post) => 
              <DrinkCard
                key={post.id} 
                userId={post.user_id}
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
  export default Profile