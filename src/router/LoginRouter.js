// Module
import { Route, Switch } from 'react-router';

// Component
import Login from '../components/Login/Login';
import Join from '../components/Login/Join';
import AccountHelp from '../components/Login/AccountHelp';


const LoginRouter  = () => {
    return (
        <>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/login/join" component={Join} />
                <Route exact path="/login/help" component={AccountHelp} />
            </Switch>
        </>
    )
}

export default LoginRouter;