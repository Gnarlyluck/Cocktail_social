import React from 'react';
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import PlaceHolder from '../assets/placeHolder.jpg'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }));

  export default function SearchCard(details) {
    const classes = useStyles();
    
  
    return (
        <Card className={classes.root}>
          <CardHeader
              title={details.title}
              />
               <NavLink to='/profile'>
          <CardMedia
              className={classes.media}
              image={details.url || PlaceHolder}
              title={details.title}
              />
       </NavLink>
          <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
              Ingredients: {details.ingredient}: {details.measurement}
              </Typography>
          </CardContent>
              <CardContent>
              <Typography paragraph>Recipe:</Typography>
              <Typography paragraph>
                  {details.recipe}
              </Typography>
              </CardContent>
          </Card>
    );
  }