import  React, {useState, useEffect} from 'react'
import {__CreateComment} from '../services/CommentServices'

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
    
    const [contentText, setContentText] = useState('')

const handleCreateComment = async (event) =>{
  event.preventDefault()
  
  try{
  let commentData= {
    content: contentText,
    user_id: details.userId,
    drink_posts_id: details.id,
    
  }
   await __CreateComment(commentData)
}catch(error){
    console.log('CreateUserComment Error!!!')
  throw error
}
}
  return (
    
      <span onSubmit={(e) => handleCreateComment(e)}>
        <form>

      <TextField
      fullwidth='true'
      id="comment"
      label="Create Comment"
      multiline
      name='comment'
      rows={2}
      style={{width: 230}}
      type="text"
      maxLength={250}
      variant="outlined"
      onChange={(e) => setContentText(e.target.value)}
      />
<Button 
    type='submit' 
    variant="outlined" 
    size="medium" 
    color="primary" 
    className={classes.margin}>
        Submit
    </Button>
      </form>
        </span>
  )

}

  export default CreateComments