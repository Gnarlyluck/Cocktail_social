import React, {useState, useEffect} from 'react'
import{Switch, Route} from 'react-router-dom'

import Layout from './Layout'

import Profile from '../pages/Profile'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import Homepage from '../pages/Homepage'
import CreatePost from '../pages/CreatePost'
import EditPost from '../pages/EditPost'
import ProtectedRoute from '../components/ProtectedRoute'

import {__CheckSession} from '../services/UserServices'

export default function Router(props) {
    
    const [authenticate, setAuthenticate] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(() => {
        verifyTokenValid()
        setPageLoading(false)
    }, [pageLoading, authenticate])

    const toggleAuthenticated = (value, user, done) => {
        setAuthenticate(value)
        setCurrentUser(user.data.user)
        done()
    }

    const verifyTokenValid = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const session = await __CheckSession(token)
                setCurrentUser(session.user)
                setAuthenticate(true)
            }catch (error){
                setCurrentUser(null)
                setAuthenticate(false)
                localStorage.clear()
            }
        }
    }
    return(
                <Switch>
                    <Route
                        exact path = '/'
                        component = {(props) => (
                            <Layout>
                                <Homepage />
                            </Layout>
                        )}
                        >
                    </Route>
                    <Route 
                        exact path = '/login'
                        component = {(props) => (
                            <Layout
                                {...props}
                            >
                                <SignInPage 
                                    toggleAuthenticated= {toggleAuthenticated}
                                    {...props}
                                />
                            </Layout>
                        )}
                    />
                    <Route 
                        exact path = '/register'
                        component = {(props) => (
                            <Layout>
                                <SignUpPage {...props} />
                            </Layout>
                        )}
                    />
                    <ProtectedRoute
                        authenticated={authenticate}
                        exact path = '/create'
                        component = {(props) => (
                            <Layout currentUser={currentUser}
                                    authenticate={authenticate}
                            >
                            <CreatePost 
                                currentUser = {currentUser}
                                {...props}
                            /> 
                        </Layout>
                        )}
                        />
                    <ProtectedRoute 
                        authenticated={authenticate}
                        exact 
                        path = "/edit/:post_id"
                        component = {(props) => (
                            <Layout
                                currentUser={currentUser}
                                authenticate={authenticate}
                            >
                                <EditPost 
                                    currentUser = {currentUser}
                                    {...props}
                                />
                            </Layout>
                        )}
                    />
                    <ProtectedRoute
                        authenticated={authenticate}
                        exact path = '/profile'
                        component = {(props) => (
                            <Layout currentUser={currentUser}
                                    authenticate={authenticate}
                            >
                            <Profile
                                currentUser = {currentUser}
                                {...props}
                            /> 
                        </Layout>
                        )}
                        />    
                </Switch>
    )
}
        
        