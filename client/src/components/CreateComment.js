import  React, {useState, useEffect} from 'react'
import {__CreateComment, __DeleteComment} from '../services/CommentServices'

import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const CreateComments = (details) => {
    const classes = useStyles()
    
    const [comments, setComments] = useState([])
    const [contentText, setContentText] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        // setComments(details.posts.Comments, [details.posts.Comments])
    })

    const handleCreateComment = async (event) =>{
      event.preventDefault()
    let commentData= {content: contentText,}
    
    try{
      const comment = await __CreateComment( 
          details.currentUser.id,
           details.post.id,
           commentData,
           setComments(comment),
           setContentText('')
    )
    }catch(error){
        console.log('CreateUserComment Error!!!')
      throw error
    }
  }
  return (
      <div>

      <TextField
      fullwidth='true'
      id="comment"
      label="Create Comment"
      multiline
      rows={2}
      style={{width: 230}}
      type="text"
      maxLength={250}
      variant="outlined"
      onChange={(e) => handleCreateComment(e.target.value)}
      />
<Button 
    type='submit' 
    variant="outlined" 
    size="medium" 
    color="primary" 
    className={classes.margin}>
        Submit
    </Button>
        </div>
  )

}

  export default CreateComments