import { useContext } from "react";
import { Route, Switch } from "react-router-dom";

// Component
import ViewRouter from './IndexRouter';
import Compare from './CompareRouter';
import AfterProduct from './AfterProductRouter';
import UserProduct from './UserProductRouter';
import Wrong from './WrongRouter';
import Search from './SearchRouter';
import LoginRouter from './LoginRouter';
import SettingRouter from './SettingRouter';
import NotFound from './NotFoundRouter';
import EventRouter from './EventRouter';
import HelpRouter from './HelpRouter';
import NonLogin from './Error/NonLogin'; 
import AccountRouter from './AccountRouter';

// Context
import {LoginContext} from '../App';

const MainRouter = () => {
    const { userInfo } = useContext(LoginContext);
    if(userInfo === null) {
        return <AccountRouter />
    } else {
        return (
            <Switch>
                <Route exact path="/" component={ViewRouter} />
                <Route path="/account" compoent={AccountRouter} />
                <Route path="/compare" component={Compare} />
                <Route exact path="/view/compare" component={Compare} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/after" component={AfterProduct} />
                <Route exact path="/event" component={EventRouter} />
                <Route exact path="/help" component={HelpRouter} />
    
                <Route path="/closet" component={UserProduct} />
                <Route path="/login" component={LoginRouter} />
                <Route path="/setting" component={SettingRouter} />
                
                <Route exact path="/notlogin" component={NonLogin} />
                <Route exact path="/error" component={Wrong} />
                <Route path="/" component={NotFound}/>
            </Switch>
        )
    }
    
}
export default MainRouter;