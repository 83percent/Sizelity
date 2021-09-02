import { Route, Switch } from "react-router";

// Component
import Main from '../components/Help/HelpMain';

const HelpRouter = () => {
    return (
        <Switch>
            <Route exact path="/help" component={Main} />
            
        </Switch>
    )
}

export default HelpRouter;