// Module
import { Route, Switch } from 'react-router';

// Component
import Auth from '../components/Login/Auth';

const LoginRouter  = () => {
    return (
        <Switch>
            <Route path="/login/auth" component={Auth} />
        </Switch>
    )
}

export default LoginRouter;