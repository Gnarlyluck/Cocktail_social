import React, {useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { __LoginUser } from '../services/UserServices'

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const SignInPage = (props) => {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(false)

    useEffect(() => {

    }, [formError])

    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            const res = await __LoginUser({
                email: email,
                password: password,
            })
            props.toggleAuthenticated(true, res, () => 
            (props.history.push('/profile')))
        }catch(error){
            setFormError(true)
            throw error
        }
    }

    return (
        <div style={{backgroundColor: 'white', padding: '50px', borderRadius:'20px', flexGrow: '1', textAlign: 'center'}}>
           <h2>Welcome Back</h2>
            <div>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div style={{margin: '20px'}}>
                        <TextField 
                            required id="standard-required" 
                            label="Required"
                            // fullwidth='true'
                            id='email'
                            label='Enter Email'
                            name='email'
                            type='email'
                            variant='outlined'
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div style={{margin: '20px'}}>
                        <TextField 
                            // fullWidth='true'
                            id='password'
                            label='Password'
                            name='password'
                            type='password'
                            variant='outlined'
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <h6 style={{color: 'red'}}>* Required field</h6>

                        <Button 
                            type='submit' 
                            variant='outlined'
                            name='button'
                            size='medium'
                            color='primary'
                            className={classes.margin}
                        >
                            Login
                        </Button>
                    {formError ? <p>Error While Logging In</p> : <p></p>}
                </form>
            </div>
        </div>
    )
}

export default SignInPage