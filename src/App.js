// Module
import {createContext, useCallback, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AccountModule from './contents/js/Account';
import { CookiesProvider, useCookies } from 'react-cookie';

// Font
import './contents/fonts/Montserrat.css';
import './contents/fonts/AppleSDGothicNeo.css';


// Component
import MainRouter from './router/MainRouter';
//import Test from './router/Test';

import dotenv from 'dotenv';

// CSS 
import './contents/css/Error.css';

// Context
export const MediaContext = createContext("Phone");
export const LoginContext = createContext(null);
export const ServerContext = createContext(null);
export const ADContext = createContext(null);

dotenv.config();

const __server = process.env.REACT_APP_SERVER_URL;

const App = ({service}) => {

    console.log("APP의 전달 값 : ", !!service , typeof service);

    // State
    const [loader, setLoader] = useState(true);
    const [media, setMedia] = useState("Phone");

    const [userInfo, setUserInfo] = useState(!!service ? undefined : {_id:"612a33e16c6da42da4263a12",name:"SNAP",gender:"male"});

    console.log("UserInfo 값 : ", userInfo);

    const [ADCheck, setADCheck] = useState(0);

    // Cookie
    const [cookie, setCookie, removeCookie] = useCookies(['sizelity_token']);

    // CallBack
    const getUser = useCallback( async () => {
        try {
            const {sizelity_token} = cookie;

            if(!sizelity_token) {
                const token = localStorage.getItem("sizelity_token");
                //console.log(token)
                if(!token) {
                    return;
                }
                else {
                    setCookie('sizelity_token', token,  {path: '/', domain: 'sizelity.com', maxAge:(500 * 24 * 60 * 60)});
                    //setCookie('sizelity_token', token,  {path: '/',maxAge:(500 * 24 * 60 * 60)});
                }
            }
            const accountModule = new AccountModule(__server);
            const result = await accountModule.autoLogin();
            if(result?._id) {
                localStorage.setItem("sizelity_token", sizelity_token);
                setCookie('sizelity_user', result, {path: '/', domain: 'sizelity.com'});
                //setCookie('sizelity_user', result, {path: '/'})
                setUserInfo(result);
            } else setUserInfo(null);
        } catch(error) {
            removeCookie('sizelity_token');
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
                <ADContext.Provider value={{ADCheck, setADCheck}}>
                    <ServerContext.Provider value={__server}>
                        <LoginContext.Provider value={{userInfo, setUserInfo, loginTrigger: () => getUser}}>
                            <MediaContext.Provider value={media}>
                                <BrowserRouter>
                                    <MainRouter />
                                </BrowserRouter>
                            </MediaContext.Provider>
                        </LoginContext.Provider>
                    </ServerContext.Provider>
                </ADContext.Provider>
            </CookiesProvider>
        );
    }
}
export default App;