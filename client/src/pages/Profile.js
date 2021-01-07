import React, {useState, useEffect} from 'react'
import { __EditPost, __DeletePost, __UpdatePost, __GetPosts } from '../services/PostServices'
import { __GetCommentsByPost } from '../services/CommentServices';
import AuthCard from '../components/card'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  export default () => {

    const classes = useStyles()

    const [posts, setPosts] = useState([])
    const [comments, setComments ] = useState([])

    const getAllPosts = async() => {
        try{
            const apiPosts = await __GetPosts()
            setPosts(apiPosts)
        }
        catch(error){
          throw error
        }
    }

    const getPostComments = async() => {
      try{
        const getComments = await __GetCommentsByPost()
        setComments(getComments)
      }catch(error){
        throw error
      }
    }
    // console.log(comments, "COMMENTS!!!")

    useEffect(() => {
        getAllPosts()
        getPostComments()
    }, [])
        return(
            <div>
            {posts.map((post) => 
            <AuthCard
                    key={post.id} 
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
