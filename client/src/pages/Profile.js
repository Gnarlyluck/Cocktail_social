import React, {useState, useEffect} from 'react'
import { __GetPosts } from '../services/PostServices'
import { __GetCommentsByPost } from '../services/CommentServices';
import DrinkCard from '../components/DrinkCard'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const Profile = (props) => {
    
    const classes = useStyles()
    
    const [posts, setPosts] = useState([])
    const [comments, setComments ] = useState([])
    
    const getAllPosts = async(e) => {
      try{
        const apiPosts = await __GetPosts()
        setPosts(apiPosts)
      }
      catch(error){
        throw error
      }
    }
    console.log(posts)
 
    useEffect(() => {
      getAllPosts()
    }, [])
        return(
          <div >
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
          </div>
        )
  }
  export default Profile