import React from 'react'
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../styles/Nav.css'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DehazeIcon from '@material-ui/icons/Dehaze';

import LocalBarIcon from '@material-ui/icons/LocalBar';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import { green, yellow } from '@material-ui/core/colors';

const Nav = ({authenticate, currentUser}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
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
                        {/* <MoreVertIcon /> */}
                        <DehazeIcon style={{ color: yellow[200]}}/>
                        {/* Options */}
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
                        <Link to={'/'}style={{textDecoration: 'none', color: 'black'}}>
                            <MenuItem onClick={() => {localStorage.clear()}} >Sign Out</MenuItem>
                        </Link>
                        <Link to={'/profile'} style={{textDecoration: 'none', color: 'black'}}>
                            <MenuItem>Feed</MenuItem>
                        </Link>
                    </Menu>
                </span>
        
               
               
                {/* <NavLink 
                to='/'
                onClick={() => { localStorage.clear() }}
                >
                    <h3> Sign Out</h3>
                </NavLink> */}
                {/* <NavLink to='/showcategory'>
                    Search by Category
                </NavLink>
                <NavLink to='/Create'>
                    Create Post
                </NavLink>
                <NavLink to='/profile'>Home</NavLink> */}
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