import React from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/Nav.css'
import Icon from '@material-ui/core/Icon';

import LocalBarIcon from '@material-ui/icons/LocalBar';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';

const Nav = ({authenticate, currentUser}) => {
    return authenticate && currentUser ? (
        <header>
            <nav>
                <NavLink 
                to='/'
                onClick={() => { localStorage.clear() }}
                >
                    <h3> Sign Out</h3>
                </NavLink>
                <NavLink to='/Create'>
                    Create Post
                </NavLink>
                <NavLink to='/profile'>Home</NavLink>
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