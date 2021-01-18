import React, {useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

import SearchCard from '../components/SearchCard'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        flexGrow: 1,
      },
      root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

const SearchResults = (props) => {
    const classes = useStyles()

    const [drinks, setDrinks] = useState([])

    const getDrinks = async() => {
        try{
            const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
                setDrinks(res.data.drinks)
                console.log(res)
        }catch(error){
            throw error
        }
    }
    
        useEffect(() => {
            // async function printDrinks() {
            //     const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
            //     setDrinks(res.data)
            //     console.log(res.data)
            // }
            // printDrinks()
            getDrinks()
        }, [])

        // console.log(drinks[0].strDrink)
    return(
        // <div>drinks go here</div>
        <Grid 
        container 
        className={classes.root} 
        spacing={0} 
        justify="center" 
        style={{margin: '2px'}}
        >

          {drinks.map((post) => 
            <SearchCard
            key={post.id} 
            userId={post.user_id}
            id={post.id}
            url={post.picture}
            title={post.title}
            description={post.description}
            recipe={post.recipe}
            comments={post.Comments}
            />)}
        </Grid>
    )
}

export default SearchResults