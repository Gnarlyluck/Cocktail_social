import React, {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {__CreateUser} from '../services/UserServices'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default (props) => {
    const classes = useStyles()
    
    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(false)

    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            let userFormData = {
                userName: userName,
                email: email,
                password: password
            }
        }catch(error){
            setFormError(true)
            throw error
        }
    }

    useEffect(() => {

    }, [formError])

    return(
        <div>
            <div>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div style={{margin: '10px'}}>
                        <TextField 
                            fullWidth='true'
                            id='email'
                            label='Email'
                            type='email'
                            variant='outlined'
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <TextField 
                            fullWidth='true'
                            id='username'
                            label='Username'
                            variant='outlined'
                            type='text'
                            onChange={(event) => setUsername(event.target.value)}
                        /> 
                    </div>
                    <div style={{margin: '10px'}}>
                    <TextField
                            fullwidth='true'
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        /> 
                    </div>
                    <Button 
                    type='submit' 
                    variant="outlined" 
                    size="medium" 
                    color="primary" 
                    className={classes.margin}>
                        Sign Up
                    </Button>
                    {formError ? <p>Error While Signing Up</p> : <p></p>}
                </form>
            </div>
        </div>        
    )
}