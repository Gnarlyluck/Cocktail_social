import { Redirect, Route } from 'react-router-dom'
const ProtectedRoute = (props) => {
     console.log(props)
 const {authenticate} = props.fromRouter
 const { component: Component} = props
    return authenticate ? 
        <Route 
            component={(props) => <Component className='something'{...props}/>}
            {...props}
        >
        </Route>
     : 
        <Redirect to='/' />
    
}   
    export default ProtectedRoute