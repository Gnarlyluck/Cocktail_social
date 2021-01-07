
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import { __GetCommentsByPost } from '../services/CommentServices';
import { __DeletePost} from '../services/PostServices'
import {__RemoveTagFromPost} from '../services/TagServices'

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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DrinkCard(details) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);
console.log(details.comments)
  // const [contentText, setContentText] = useState('')
  // const [postId, setPostId] = useSate(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleSubmit = async (event) =>{
  //   event.preventDefault()
  //   try{
  //     let commentData= {
  //       content: contentText,
  //       userId: details.currentUser.id,
  //       // postId: postId

  //     }
  //   }catch(error){
  //     throw error
  //   }
  // }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deletePost = async (postId) => {
    try{
        let del =await __RemoveTagFromPost(postId)
        let res = await __DeletePost(postId)
        // props.history.push("/profile")
    }catch(error){
        throw error
    }
}
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <div>
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
          <Link to={`/edit/${details.id}`}>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
                    </Link>
            <MenuItem onClick={() => {deletePost(details.id) }} >Delete</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
              </div>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon /> 
        </IconButton>
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
              // onChange={() => ()}
              />
          </Typography>
          <Typography paragraph>
        {details.comments.map((comment, index)=> (
            <span key={index}>
              <ul>
                <li>{comment.content}</li>
              </ul>
            </span>
        ))}
          </Typography>
        </CardContent>
        <CardContent>
    
        </CardContent>
      </Collapse>
    </Card>
  );
}
