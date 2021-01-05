import React from 'react'
import Nav from './Nav'
import '../styles/Layout.css'

export default ({authenticate, currentUser, children, history}) => (
    <div className='layout'> 
        <Nav 
        authenticate={authenticate}
        currentUser={currentUser}
        history={history}
        />
        <div style={
        {display:"flex", 
        height:'100%', 
        flexDirection: 'row', 
        flexGrow: '1', 
        justifyContent: 'left'}}
        >
            {children}
        </div>   
    </div>
)