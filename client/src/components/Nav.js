import React from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/Nav.css'

export default ({authenticate, currentUser}) => {
    return authenticate && currentUser ? (
        <header>
            <nav>
                <NavLink 
                to='/'
                onClick={() => { localStorage.clear() }}
                >
                    <h3> Sign Out</h3>
                </NavLink>
                <NavLink to='/profile'>Profile</NavLink>
            </nav>
        </header>
    ) : (
    <header>
        <nav>
            <NavLink to='/register'>
                <h3>Sign Up</h3>
            </NavLink>
            <NavLink to='/login'>
                <h3>Sing In</h3>
            </NavLink>
            <h1><a href='/'>Home</a></h1>
        </nav>
    </header>
    )
}