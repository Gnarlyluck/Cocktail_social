import { Redirect, Route } from 'react-router-dom'

 const ProtectedRoute = ({ authenticated, children, component: Component, ...rest}) =>
    authenticated === true ? (
        <Route {...rest} component={Component}>
        </Route>
    ) : (
        <Redirect to='/' />
    )

    export default ProtectedRoute