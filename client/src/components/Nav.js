import React from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../styles/Nav.css'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DehazeIcon from '@material-ui/icons/Dehaze';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import { green, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

const Nav = ({authenticate, currentUser}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    return authenticate && currentUser ? (
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
                        <NavLink to={`/Create`} style={{textDecoration: 'none', color: 'black'}}>
                            <MenuItem onClick={handleClose} >Creat Post</MenuItem>
                        </NavLink>
                        <Link to={'showcategory'} style={{textDecoration: 'none', color: 'black'}}>
                            <MenuItem>Search By Category</MenuItem>
                        </Link>
                        <Link to={'/profile'} style={{textDecoration: 'none', color: 'black'}}>
                            <MenuItem>Feed</MenuItem>
                        </Link>
                        <Link to={'/search'} style={{textDecoration: 'none', color: 'black'}}>
                            <MenuItem>Look up cocktail</MenuItem>
                        </Link>
                        <Link to={'/'}style={{textDecoration: 'none', color: 'black'}}>
                            <MenuItem onClick={() => {localStorage.clear()}} >Sign Out</MenuItem>
                        </Link>
                    </Menu>
                </span>
                <span>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon style={{color: '#faf390'}}/>
                        </div>
                            <InputBase
                            placeholder="Look up Cocktails"
                            style={{color: '#faf390'}}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                    </div>
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