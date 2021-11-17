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
export const ProductContext = createContext(null);

dotenv.config();

//const __server = process.env.REACT_APP_SERVER_URL;
const __server = "http://192.168.11.2:3001";

const App = () => {
    // State
    const [loader, setLoader] = useState(true);
    const [media, setMedia] = useState("Phone");
    const [userInfo, setUserInfo] = useState(undefined);
    //const [userInfo, setUserInfo] = useState({_id:"6182538212b54635c00387af",name:"JAE HOON LEE",gender:"male"});
    const [productData, setProductData] = useState(null);

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
                    setUserInfo(null);
                    return;
                }
                else {
                    //setCookie('sizelity_token', token,  {path: '/', domain: 'sizelity.com', maxAge:(500 * 24 * 60 * 60)});
                    setCookie('sizelity_token', token,  {path: '/', maxAge:(500 * 24 * 60 * 60)});
                }
            }
            const accountModule = new AccountModule(__server);
            const result = await accountModule.autoLogin();
            if(result?._id) {
                localStorage.setItem("sizelity_token", sizelity_token);
                //setCookie('sizelity_user', result, {path: '/', domain: 'sizelity.com'});
                setCookie('sizelity_user', result, {path: '/'})
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
                <ProductContext.Provider value={{productData, setProductData}}>
                    <ServerContext.Provider value={__server}>
                        <LoginContext.Provider value={{userInfo, setUserInfo, loginTrigger: () => getUser}}>
                            <MediaContext.Provider value={media}>
                                <BrowserRouter>
                                    <MainRouter />
                                </BrowserRouter>
                            </MediaContext.Provider>
                        </LoginContext.Provider>
                    </ServerContext.Provider>
                </ProductContext.Provider>
            </CookiesProvider>
        );
    }
}
export default App;