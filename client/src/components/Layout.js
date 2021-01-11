import React from 'react'
import Nav from './Nav'
import '../styles/Layout.css'

const Layout=({authenticate, currentUser, children, history}) => (
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
            justifyContent: 'center'}}
            >
            {children}
        </div>   
    </div>
)
export default Layout