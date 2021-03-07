// Module
import { Route, Switch } from "react-router";

// Component
import Setting from '../components/Setting/Setting';

const SettingRouter = () => {
    return (
        <>
            <Switch>
                <Route exact to="/setting" component={Setting} />
            </Switch>
        </>
    )
}

export default SettingRouter;