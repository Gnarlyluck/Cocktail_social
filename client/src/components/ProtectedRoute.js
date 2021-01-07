import { Redirect, Route } from 'react-router-dom'

export default ({ authenticated, children, component: Component, ...rest}) =>
    authenticated === true ? (
        <Route {...rest} component={Component}>
        </Route>
    ) : (
        <Redirect to='/' />
    )