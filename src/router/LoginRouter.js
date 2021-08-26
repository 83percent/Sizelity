// Module
import { Route, Switch } from 'react-router';

// Component
import Login from '../components/Login/Login';
import Join from '../components/Login/Join';
import Auth from '../components/Login/Auth';

const LoginRouter  = () => {
    return (
        <>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/join" component={Join} />
                <Route exact path="/login/auth" component={Auth} />
            </Switch>
        </>
    )
}

export default LoginRouter;