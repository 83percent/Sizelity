// Module
import {createContext, useCallback, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AccountModule from './contents/js/Account';
import { CookiesProvider, useCookies } from 'react-cookie';

// Font
import './contents/fonts/Montserrat.css';
import './contents/fonts/AppleSDGothicNeo.css';


// Component
import MainRouter from './router/MainRouter';
import Test from './router/Test';

import dotenv from 'dotenv';

// CSS 
import './contents/css/Error.css';

// Context
export const MediaContext = createContext("Phone");
export const LoginContext = createContext(null);
export const ServerContext = createContext(null);

dotenv.config();

const __server = process.env.REACT_APP_SERVER_TEST_URL;
//const __server = process.env.REACT_APP_SERVER_URL;

const App = () => {
    // State
    const [loader, setLoader] = useState(true);
    const [media, setMedia] = useState("Phone");
    const [userInfo, setUserInfo] = useState(undefined);
    
    // Cookie
    const [cookie, setCookie, removeCookie] = useCookies(['sizelity_token']);

    // CallBack
    const getUser = useCallback( async () => {
        const {sizelity_token} = cookie;
        try {
            const accountModule = new AccountModule(__server);
            if(!sizelity_token) {
                const token = localStorage.getItem("sizelity_token");
                if(token === null) {
                    setUserInfo(null);
                    return;
                } else setCookie('sizelity_token', token);
            }
            const result = await accountModule.autoLogin();
            if(result?._id) {
                localStorage.setItem("sizelity_token", sizelity_token);
                setUserInfo(result);
            } else setUserInfo(null);
        } catch(error) {
            if(sizelity_token) removeCookie('sizelity_token');
            setUserInfo(null);
        } finally {
            setLoader(false);
        }
    }, [cookie, setCookie, removeCookie]);


    // autoLogin
    useEffect(() => {
        if(userInfo === undefined) getUser();
    }, [userInfo, getUser]);
    useEffect(() => {
        setMedia(window.screen.width > 1024 ? "Desktops" : "Phone");
    }, []);
    
    if(loader) {
        return (
            <div className="loader-frame">
                <div className="loader"></div>
            </div>
        )
    } else {
        return (
            <CookiesProvider>
                <ServerContext.Provider value={__server}>
                    <LoginContext.Provider value={{userInfo, setUserInfo}}>
                        <MediaContext.Provider value={media}>
                            <BrowserRouter>
                                <Switch>
                                    <Route exact path="/test" component={Test}/>
                                    <Route path="/" component={MainRouter} />
                                </Switch>
                            </BrowserRouter>
                        </MediaContext.Provider>
                    </LoginContext.Provider>
                </ServerContext.Provider>
            </CookiesProvider>
        );
    }
}
export default App;