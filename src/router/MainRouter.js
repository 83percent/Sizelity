import { useContext, useMemo } from "react";
import { Route, Switch } from "react-router-dom";

// Component
import IndexRouter from './IndexRouter';
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
import {LoginContext, MediaContext} from '../App';
import DocHelp from "../components/DocHelp/DocHelp";

const MainRouter = () => {
    const { userInfo } = useContext(LoginContext);
    const media = useContext(MediaContext);
    const isPopup = useMemo(() => {
        if(media === "Phone") return true;
        else {
            return window.outerWidth > 600 ? false : true
        }
    }, [media])
    if(isPopup) {
        // Phone 또는 Popup
        if(userInfo === null) {
            //console.info("USERINFO === NULL")
            return (
                <Switch>
                    <Route path="/login" component={LoginRouter} />
                    <Route path="/" component={AccountRouter} />
                </Switch>
            )
        } else {
            //console.info("USERINFO === NULL ELSE")
            return (
                <Switch>
                    <Route exact path="/" component={IndexRouter} />
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
    } else {
        //console.info("isPopup === FALSE")
        return (
            <DocHelp />
        )
    }
}
export default MainRouter;