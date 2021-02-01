import React, {useState, useEffect} from 'react'
import{Switch, Route} from 'react-router-dom'

import Profile from '../pages/Profile'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import Homepage from '../pages/Homepage'
import CreatePost from '../pages/CreatePost'
import EditPost from '../pages/EditPost'
import Nav from '../components/Nav'
import SearchResults from '../pages/SearchResults'
import ProtectedRoute from '../components/ProtectedRoute'
import SearchByCategory from '../pages/SearchByCategory'
import {__CheckSession} from '../services/UserServices'

export default function Router(props) {
    
    const [authenticate, setAuthenticate] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    useEffect(() => {
        setPageLoading(false)
    }, [pageLoading])

    useEffect(() => {
        if (authenticate){
            verifyTokenValid()
        }
    }, [authenticate])

    const toggleAuthenticated = (value, user, done) => {
        setAuthenticate(value)
        setCurrentUser(user)
    }
    const verifyTokenValid = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const session = await __CheckSession(token)
                setCurrentUser(session.user)
                setAuthenticate(true)
                //gonna have to fix this!!
            }catch (error){
                setCurrentUser(null)
                setAuthenticate(false)
                localStorage.clear()
            }
        }
    }
    const navStyles = {
        display:"flex", 
        height:'100%', 
        flexDirection: 'row', 
        flexGrow: '1', 
        justifyContent: 'center'
    }

    const propsForPages = {
        authenticate, 
        setAuthenticate,
        currentUser, 
        setCurrentUser,
        toggleAuthenticated
    }
    return(
        <div className='layout'> 
        <Nav 
            fromRouter={{...propsForPages}}
            {...props}
        />
        <div style={navStyles}>
            <Switch>
                <Route
                    exact path = '/'
                    component={(props) => (
                            <Homepage 
                            fromRouter={{...propsForPages}}
                            {...props}
                            />
                    )}
                    >
                </Route>
                <Route 
                    exact path = '/login'
                    component={(props) => (
                            <SignInPage 
                            fromRouter={{...propsForPages}}
                                {...props}
                            />
                    )}
                />
                <Route 
                    exact path = '/register'
                    component={(props) => (
                            <SignUpPage 
                            fromRouter={{...propsForPages}}
                            {...props} />
                    )}
                />
                <Route
                    exact path = '/create'
                    component={(props) => (
                        
                        <CreatePost 
                        fromRouter={{...propsForPages}}
                            {...props}
                        /> 
                    )}
                    />
                <ProtectedRoute 
                    exact 
                    path = "/showcategory"
                    fromRouter={{...propsForPages}}
                    component={(props) => (
                       
                            <SearchByCategory
                            {...props}
                            />
                    )}
                />
                    <Route 
                        exact path = "/search"
                        component={(props) => (
                            
                            <SearchResults 
                            fromRouter={{...propsForPages}}
                                    {...props}
                                />
                        )} 
                    />
                <Route 
                    exact 
                    path = "/edit/:post_id"
                    component={(props) => (
                        
                        <EditPost 
                        fromRouter={{...propsForPages}}
                                {...props}
                            />
                    )}
                />
                <Route
                    exact path = '/profile'
                    component={(props) => (
                        
                        <Profile
                        fromRouter={{...propsForPages}}
                            {...props}
                        /> 
                    )}
                    />    
            </Switch>
        </div>   
    </div>
    )
}
        
        