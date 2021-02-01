import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'


import '../styles/Nav.css'
import { 
  IconButton, 
  Menu,
  MenuItem,
  TextField,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import { yellow } from '@material-ui/core/colors';

// const useStyles = makeStyles((theme) => ({
//     grow: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       display: 'none',
//       [theme.breakpoints.up('sm')]: {
//         display: 'block',
//       },
//     },
//     search: {
//       position: 'relative',
//       borderRadius: theme.shape.borderRadius,
//       backgroundColor: fade(theme.palette.common.white, 0.15),
//       '&:hover': {
//         backgroundColor: fade(theme.palette.common.white, 0.25),
//       },
//       marginRight: theme.spacing(2),
//       marginLeft: 0,
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(3),
//         width: 'auto',
//       },
//     },
//     searchIcon: {
//       padding: theme.spacing(0, 2),
//       height: '100%',
//       position: 'absolute',
//       pointerEvents: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     inputRoot: {
//       color: 'inherit',
//     },
//     inputInput: {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('md')]: {
//         width: '20ch',
//       },
//     },
//     sectionDesktop: {
//       display: 'none',
//       [theme.breakpoints.up('md')]: {
//         display: 'flex',
//       },
//     },
//     sectionMobile: {
//       display: 'flex',
//       [theme.breakpoints.up('md')]: {
//         display: 'none',
//       },
//     },
//   }));


const Nav = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [search, setSearch] = useState('')
    const [drinks, setDrinks] = useState([])
    const {authenticate, currentUser} = props.fromRouter
    // const classes = useStyles();
    const [loaded, setLoaded]  = useState(false)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const toggle = props.fromRouter.toggleAuthenticated
    const handleClose = () => {
      setAnchorEl(null);
    };


    // const handleChange = (e) => {
    //   e.preventDefault()
    //   setSearch(e.target.value)
    //   // console.log(e.target.value)
    // }

    // const getDrinks = async(e) => {
    //   try{
    //     const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    //     setDrinks(res.data.drinks)
    //   }catch(error){
    //     throw error
    //   }
    // }
    
    // const handleSubmit = async(e) => {
    // try{
    //   e.preventDefault()
    //   await getDrinks()
    // }catch(error){
    //     // console.log(error)
    //     throw error
    //   }
    // }

//   useEffect(() => {
//     getDrinks()
// }, [])

useEffect(() => {
  if (currentUser !==''){
    setLoaded(true)
  }
}, [currentUser])

    const linkStyle = {textDecoration: 'none', color: 'black'}

    return !loaded? <div>Loading...</div> :
    
    authenticate && currentUser ? (
        <header>
            <nav>
                <span >
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <DehazeIcon style={{ color: yellow[200]}}/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                        <NavLink to={`/Create`} style={linkStyle}>
                            <MenuItem onClick={handleClose} >Create Post</MenuItem>
                        </NavLink>
                        <NavLink to={'showcategory'} style={linkStyle}>
                            <MenuItem>Search By Category</MenuItem>
                        </NavLink>
                        <NavLink to={'/profile'} style={linkStyle}>
                            <MenuItem>Feed</MenuItem>
                        </NavLink>
                        <NavLink to={'/search'} style={linkStyle}>
                            <MenuItem>Look up cocktail</MenuItem>
                        </NavLink>
                        <NavLink to={'/'} style={linkStyle}>
                            <MenuItem onClick={() => toggle(false, null)} >Sign Out</MenuItem>
                        </NavLink>
                    </Menu>
                </span>
                <h1 >COCKTAIL SOCIAL {<LocalBarIcon/>}</h1>
            </nav>
        </header>
    ) : (
    <header>
        <nav>
            <NavLink to='/register'>
                <h3>{<CreateTwoToneIcon/>}Sign Up</h3>
            </NavLink>
            <NavLink to='/login'>
                <h3>{<PlayForWorkIcon/>}Sign In</h3>
            </NavLink>
            <h1 ><a href='/'>COCKTAIL SOCIAL {<LocalBarIcon/>}</a></h1>
        </nav>
    </header>
    )
}

export default Nav