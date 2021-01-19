import React from 'react';
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import PlaceHolder from '../assets/placeHolder.jpg'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      paddingTop: ' 0px',
      paddingBottom: '0px'
    },
    media: {
      height: 0,
      paddingTop: '100%', // 16:9
    },
    list: {
      
    }
  }));
  // classes={{paddingTop: '0px', paddingBottom: '0px'}}
  export default function SearchCard(details) {
    const classes = useStyles();
    
  
    return (
        <Card className={classes.root}>
          <CardHeader
              title={details.title}
              />
          <CardMedia
              className={classes.media}
              image={details.url || PlaceHolder}
              title={details.title}
              />
          <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <List className ={classes.root}> 
                  <ListItem>
                    Ingredients: 
                  </ListItem>
                  <ListItem>
                    {details.ingredient}: {details.measurement}
                  </ListItem>
                  <ListItem>
                    {details.ingredient2}: {details.measurement2}
                  </ListItem>
                  <ListItem>
                  {details.ingredient3}: {details.measurement3}
                  </ListItem>
                  <ListItem>
                    {details.ingredient4}: {details.measurement4}
                  </ListItem>
                </List>
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