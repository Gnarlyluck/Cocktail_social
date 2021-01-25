import React from 'react'
import Nav from './Nav'
import '../styles/Layout.css'

const Layout=(props) => {
    
    const navStyles = {
        display:"flex", 
        height:'100%', 
        flexDirection: 'row', 
        flexGrow: '1', 
        justifyContent: 'center',
        
    }

    return (
    <div className='layout'> 
        <Nav 
            {...props}
        />
        <div style={navStyles}>
            {props.children}
        </div>   
    </div>
)}
export default Layout