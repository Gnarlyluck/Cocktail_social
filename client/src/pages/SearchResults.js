import React, {useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles'
import SearchCard from '../components/SearchCard'
import Button from '@material-ui/core/Button';
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
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
      }
      console.log(search)    
    const getDrinks = async(e) => {
      try{
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
                setDrinks(res.data.drinks)
        }catch(error){
          console.log(error)
            throw error
        }
    }
    
        useEffect(() => {
            getDrinks()
        }, [])
    return(
        <div>
        <h1>This feature currently under construction</h1>
        <div style={{display: 'flex',  justifyContent: 'center'}}>
          <form onSubmit={(e) => getDrinks(e)}>
            <TextField
              fullwidth='true'
              id="username"
              label="search"
              value={search}
              variant="outlined"
              type="text"
              onChange={handleChange}
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
        </div>
        <Grid 
          container 
          className={classes.root} 
          spacing={0} 
          justify="center" 
          style={{margin: '2px'}}
        >
          {drinks.map((post) => 
            <SearchCard
            key={post.idDrink} 
            url={post.strDrinkThumb}
            title={post.strDrink}
            ingredient={post.strIngredient1}
            ingredient2={post.strIngredient2}
            ingredient3={post.strIngredient3}
            ingredient4={post.strIngredient4}
            measurement={post.strMeasure1}
            measurement2={post.strMeasure2}
            measurement3={post.strMeasure3}
            measurement4={post.strMeasure4}
            recipe={post.strInstructions}
            />)}
        </Grid>
        </div>
    )
}

export default SearchResults