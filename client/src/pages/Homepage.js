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
console.log(posts)
        return (
          <div>
            {posts.map((post) => <Card
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
