
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { __GetCommentsByPost } from '../services/CommentServices';
import { __DeletePost} from '../services/PostServices'
import {__RemoveTagFromPost} from '../services/TagServices'
import PlaceHolder from '../assets/placeHolder.jpg'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import Button from '@material-ui/core/Button';


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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expanded, setExpanded] = React.useState(false);
  // const [comments, setComments ] = useState([])

console.log(details.comments)
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

  // const getPostComments = async(postId) => {
  //     try{
  //       const getComments = await __GetCommentsByPost(postId)

  //       setComments(getComments)
  //     }catch(error){
  //       throw error
  //     }
  //   }

  //   useEffect(() => {
  //     getPostComments()
  // }, [])
  
  return (
    
    <Card className={classes.root}>
      
      <CardHeader
        action={
          <div>

          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon />
          {/* </Button> */}
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
          <AddCommentIcon />
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
           {/* {details.comments} */}
        {details.comments.map((comment)=> (
          <p>
           {comment.content}
          </p>
        ))}
          </Typography>
        </CardContent>
        <CardContent>
    
        </CardContent>
      </Collapse>
    </Card>
  );
}
      //get comments from database and
      // comments should display get function operable