import React, {useState, useEffect} from 'react'
import{Switch, Route} from 'react-router-dom'

import Layout from './Layout'

import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

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
                </Switch>
    )
}
        
        