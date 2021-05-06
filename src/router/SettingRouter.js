// Module
import { Route, Switch } from "react-router";

// Component
import Setting from '../components/Setting/Setting';

// - User
import ChangeInfomation from '../components/Setting/InformaionChange';
import ChangePassword from '../components/Setting/PasswordChange';
import AccountOut from "../components/Setting/AccountOut";

const SettingRouter = () => {
    console.log();
    return (
        <>
            <Switch>
                <Route exact path="/setting/" component={Setting} />
                <Route exact path="/setting/chinfo" component={ChangeInfomation} />
                <Route exact path="/setting/chpwd" component={ChangePassword} />
                <Route exact path="/setting/accountout" component={AccountOut} />
            </Switch>
        </>
    )
}

export default SettingRouter;