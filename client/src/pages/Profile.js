import React, {useState, useEffect} from 'react'
import { __GetPosts } from '../services/PostServices'
import DrinkCard from '../components/DrinkCard'

import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        flexGrow: 1,
      },
      root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
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
          spacing={0} 
          justify="center" 
          // style={{margin: '2px'}}
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