// Module
import {createContext, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AccountModule from './contents/js/Account';
import { CookiesProvider } from 'react-cookie';

// Font
import './contents/fonts/Montserrat_use.css';
import './contents/fonts/NotoSans.css';

// Component
import ViewRouter from './router/ViewRouter';

import Compare from './router/CompareRouter';
import AfterProduct from './router/AfterProductRouter';
import UserProduct from './router/UserProductRouter';
import Wrong from './router/WrongRouter';
import Search from './router/Search';
import LoginRouter from './router/LoginRouter';
import SettingRouter from './router/SettingRouter';
import NotFound from './router/NotFoundRouter';
import EventRouter from './router/EventRouter';
import HelpRouter from './router/HelpRouter';

import NonLogin from './router/Error/NonLogin'; 

import Test from './router/Test';

import dotenv from 'dotenv';

// CSS 
import './contents/css/Alert.css';
import './contents/css/Error.css';

// Context
export const MediaContext = createContext("Phone");
export const LoginContext = createContext(null);
export const ServerContext = createContext(null);

dotenv.config();
console.log("URL : ", process.env)

const __server = process.env.REACT_APP_SERVER_TEST_URL;
//const __server = process.env.REACT_APP_SERVER_URL;

let accountModule = null;
const App = () => {

    // State
    const [media, setMedia] = useState("Phone");
    const [userInfo, setUserInfo] = useState(() => {
        const auth = sessionStorage.getItem("auth");
        if(!auth) return null;
        else {
            return JSON.parse(auth);
        }
    });
    

    // autoLogin
    useEffect(() => {
        if(userInfo === null) {
            ( async () => {
                if(!accountModule) accountModule = new AccountModule(__server);
                const auth = await accountModule.autoLogin();
                setUserInfo(auth);
            })();
        }
    }, [accountModule]);
    /* useEffect(() => {
        if(userInfo !== null) setCookie("sizelity_user",userInfo,{path:"/",maxAge:(500 * 24 * 60 * 60)})
    }, [userInfo]); */

    useEffect(() => {
        setMedia(window.screen.width > 1024 ? "Desktops" : "Phone");
    }, []);
    
    return (
        <CookiesProvider>
            <ServerContext.Provider value={__server}>
                <LoginContext.Provider value={{userInfo, setUserInfo}}>
                    <MediaContext.Provider value={media}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/" component={ViewRouter} />
                                <Route path="/compare" component={Compare} />
                                <Route exact path="/view/compare" component={Compare} />
                                <Route exact path="/search" component={Search} />
                                <Route exact path="/after" component={AfterProduct} />
                                <Route exact path="/event" component={EventRouter} />
                                <Route exact path="/help" component={HelpRouter} />

                                <Route path="/closet" component={UserProduct} />
                                <Route path="/login" component={LoginRouter} />
                                <Route path="/setting" component={SettingRouter} />
                                
                                <Route exact path="/test" component={Test}/>
                                
                                <Route exact path="/notlogin" component={NonLogin} />
                                <Route exact path="/error" component={Wrong} />
                                <Route path="/" component={NotFound}/>
                            </Switch>
                        </BrowserRouter>
                    </MediaContext.Provider>
                </LoginContext.Provider>
            </ServerContext.Provider>
        </CookiesProvider>
    );
}
export default App;