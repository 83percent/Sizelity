// Module
import { Route, Switch } from 'react-router';

// Component
import Login from '../components/Login/Login';
import Join from '../components/Login/Join';

const LoginRouter  = () => {
    return (
        <>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/join" component={Join} />
            </Switch>
        </>
    )
}

export default LoginRouter;