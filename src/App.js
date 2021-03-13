// Module
import {createContext, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginModule from './contents/js/Login';
import { CookiesProvider, useCookies } from 'react-cookie';

// Font
import './contents/fonts/Montserrat_use.css';
import './contents/fonts/NotoSans.css';

// Component
import View from './router/View';

import Compare from './router/Compare';
import AfterProduct from './router/AfterProduct';
import UserProduct from './router/UserProduct';
import Wrong from './router/WrongRouter';
import Search from './router/Search';
import LoginRouter from './router/LoginRouter';
import SettingRouter from './router/SettingRouter';
import NotFound from './router/NotFoundRouter';


import Test from './router/Test';


// Context
export const MediaContext = createContext("Phone");
export const LoginContext = createContext(null);

let login = null;
const App = () => {
    const [media, setMedia] = useState("Phone");
    const [{sizelity_user}, setCookie, removeCookie] = useCookies("sizelity_user");
    const [userInfo, setUserInfo] = useState(sizelity_user ? sizelity_user._id ? sizelity_user : null : null);

    //const __userInfo = useMemo(() => {}, [sizelity_user._id]);
    // autoLogin
    useEffect(() => {
        if(sizelity_user && sizelity_user._id) {
            
            console.log("%c Auto login check...", "background: red; color:#fff;")

            if(!login) login = new LoginModule();
            ( async () => {
                const a_l = await login.send({_id : sizelity_user._id, upwd : sizelity_user.sili_p});
                if(a_l === true) {
                    setUserInfo(sizelity_user);
                } else {
                    // 잘못된 정보의 Cookie 를 갖고 있기에 삭제
                    console.log("Delete User Auto Login Information")
                    removeCookie("sizelity_user");
                }
            })();
        }
    }, []);
    useEffect(() => {
        if(userInfo !== null) setCookie("sizelity_user",userInfo,{path:"/",maxAge:(500 * 24 * 60 * 60)})
    }, [userInfo]);

    useEffect(() => {
        setMedia(window.screen.width > 1024 ? "Desktops" : "Phone");
    }, []);
    
    return (
        <CookiesProvider>
            <LoginContext.Provider value={{userInfo, setUserInfo}}>
                <MediaContext.Provider value={media}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={View} />
                            <Route exact path="/compare" component={Compare} />
                            <Route exact path="/view/compare" component={Compare} />
                            <Route exact path="/closet" component={UserProduct} />
                            <Route exact path="/search" component={Search} />
                            <Route exact path="/after" component={AfterProduct} />

                            <Route path="/login" component={LoginRouter} />
                            <Route path="/setting" component={SettingRouter} />
                            
                            <Route exact path={"/test"} component={Test}/>
                            
                            
                            <Route exact path="/notlogin" component={Wrong} />
                            <Route exact path="/error" component={Wrong} />
                            <Route path="/" component={NotFound}/>
                        </Switch>
                    </BrowserRouter>
                </MediaContext.Provider>
            </LoginContext.Provider>
        </CookiesProvider>
    );
}
export default App;