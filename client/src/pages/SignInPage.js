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

export default (props) => {
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
            (props.history.push('/create')))
        }catch(error){
            setFormError(true)
            throw error
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div>
                        <TextField 
                            fullwidth='true'
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
                            id='password'
                            label='Password'
                            type='password'
                            variant='outlined'
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                        <Button 
                            type='submit' 
                            variant='outlined'
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
