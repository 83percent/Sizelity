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

const App = () => {
    
    // State
    const [loader, setLoader] = useState(true);
    const [media, setMedia] = useState("Phone");
    const [userInfo, setUserInfo] = useState(undefined);
    const [ADCheck, setADCheck] = useState(0);

    // Cookie
    const [cookie, setCookie, removeCookie] = useCookies(['sizelity_token']);

    // CallBack
    const getUser = useCallback( async () => {
        try {
            const {sizelity_token} = cookie;

            console.info("App : cookie token : ", sizelity_token);

            if(!sizelity_token) {
                const token = localStorage.getItem("sizelity_token");
                console.info("쿠키토큰 없어서 저장소 탐색 : ", token);
                if(!token) {
                    console.info("저장소에도 토큰이 없어서 자동로그인을 종료합니다.");
                    setUserInfo(null);
                    return;
                }
                else {
                    setCookie('sizelity_token', token,  {path: '/', domain: 'sizelity.com',maxAge:(500 * 24 * 60 * 60)});
                    //setCookie('sizelity_token', token,  {path: '/',maxAge:(500 * 24 * 60 * 60)});
                    console.info("저장소에 토큰이 있어 쿠키에 복사 : ", token);
                }
            }
            const accountModule = new AccountModule(__server);
            const result = await accountModule.autoLogin();
            console.log("서버에 로그인 여부 확인 결과 : ", result);
            if(result?._id) {
                console.log("결과를 'userInfo로 지정'");
                localStorage.setItem("sizelity_token", sizelity_token);
                setUserInfo(result);
            } else setUserInfo(null);
        } catch(error) {
            console.log("애러 발생", error);
            removeCookie('sizelity_token');
            setUserInfo(null);
        } finally {
            setLoader(false);
        }
    }, [cookie, setCookie, removeCookie]);


    // autoLogin
    useEffect(() => {
        if(!userInfo) getUser();
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