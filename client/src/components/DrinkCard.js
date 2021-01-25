
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { __DeletePost} from '../services/PostServices'
import {__RemoveTagFromPost} from '../services/TagServices'
import {__CreateComment, __DeleteComment} from '../services/CommentServices'
import PlaceHolder from '../assets/placeHolder.jpg'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';





const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function DrinkCard(details) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
  
  const [contentText, setContentText] = useState('')
  // const [description, setDescription] =useState('')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const deletePost = async (postId) => {

    try{
        await __RemoveTagFromPost(postId)
        await __DeletePost(postId)
        // details.push("/profile")
    }catch(error){
        throw error
    }
}
const handleCreateComment = async (event) =>{
  event.preventDefault()
  try{
    let commentData= {
      content: contentText,
      user_id: details.userId,
      drink_posts_id: details.id
    }
    await __CreateComment(commentData)
  }catch(error){
    console.log('CreateUserComment Error!!!')
    throw error
  }
}
const deleteComment = async(event) =>{
  event.preventDefault()
  try{
      await __DeleteComment(event.target.value)
  }catch(error){
    throw error
  }
}
  return (
    
    <Card className={classes.root} style={{width: '45vw', backgroundColor: '#faf390'}}>
      <CardHeader
        action={
          <span>
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
          <Link to={`/edit/${details.id}`} style={{textDecoration: 'none', color: 'black'}}>
            <MenuItem onClick={handleClose} >Edit</MenuItem>
          </Link>
            <MenuItem onClick={() => {deletePost(details.id) }} >Delete</MenuItem>
          </Menu>
              </span>
        }
        title={details.title}
        />
     
      <CardMedia
        className={classes.media}
        image={details.url || PlaceHolder}
        title={details.title}
        />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {details.description}
        </Typography>
        <Typography>
          {details.recipe}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
            <AddCommentIcon />
            <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments</Typography>
            <Typography paragraph>
              <form onSubmit={(e) => handleCreateComment(e)}>
                <TextField
                  fullwidth='true'
                  id="comment"
                  label="Create Comment"
                  multiline
                  name='comment'
                  rows={2}
                  style={{width: 140}}
                  type="text"
                  maxLength={250}
                  variant="outlined"
                  onChange={(e) => setContentText(e.target.value)}
                  />
                <Button 
                  type='submit' 
                  variant="outlined" 
                  size="small" 
                  color="primary" 
                  className={classes.margin}>
                      Submit
                </Button>
              </form>
            </Typography>
          <Typography paragraph>
            {details.comments.map((comment, index)=> (
              <span >
                <List>
                  <ListItem>
                    <ListItemText key={index}></ListItemText>
                    <ListItemText>{comment.content} </ListItemText>
                    <MenuItem value={comment.id} onClick={deleteComment} >
                    Delete
                    </MenuItem>
                  </ListItem>
                </List>
              </span>
            ))}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
