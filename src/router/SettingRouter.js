// Module
import { Route, Switch } from "react-router";

// Component
import SettingList from '../components/Setting/SettingList';

// - User
import ChangeInfomation from '../components/Setting/InformaionChange';
import AccountOut from "../components/Setting/AccountOut";

const SettingRouter = () => {
    console.log();
    return (
        <>
            <Switch>
                <Route exact path="/setting/" component={SettingList} />
                <Route exact path="/setting/chinfo" component={ChangeInfomation} />
                <Route exact path="/setting/accountout" component={AccountOut} />
            </Switch>
        </>
    )
}

export default SettingRouter;