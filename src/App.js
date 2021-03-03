// Module
import {createContext, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginModule from './contents/js/Login';
import { CookiesProvider, useCookies } from 'react-cookie';

// Style
import './contents/css/App.css';
import './contents/fonts/Montserrat_use.css';
import './contents/fonts/NotoSans.css';

// Component
import Home from './router/Home';
import View from './router/View';
import Compare from './router/View_Compare';
import NotFound from './router/NotFound';
import AfterProduct from './router/AfterProduct';
import UserProduct from './router/UserProduct';
import Wrong from './router/Wrong';
import Login from './components/View/View_Login';
import Join from './components/View/View_Join';
import Search from './components/View/View_Search';
import UserMenu from './components/View/View_User_Menu';

import Test from './router/Test';

export const MediaContext = createContext("Phone");
export const LoginContext = createContext(null);
const App = () => {
    const [media, setMedia] = useState("Phone");
    const [{sizelity_user}, setCookie, removeCookie] = useCookies("sizelity_user");
    const [userInfo, setUserInfo] = useState(sizelity_user ? sizelity_user._id ? sizelity_user : null : null);

    // autoLogin
    useEffect(() => {
        if(sizelity_user && sizelity_user._id) {
            console.log("App.js auto login logic : ",sizelity_user);
            const login = new LoginModule();
            ( async () => {
                const a_l = await login.send({_id : sizelity_user._id, upwd : sizelity_user.sili_p});
                if(a_l === true) {
                    setUserInfo(sizelity_user);
                } else {
                    // 잘못된 정보의 Cookie 를 갖고 있기에 삭제
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
                            <Route exact path={"/"} component={Home}/>
                            <Route exact path={"/test"} component={Test}/>
                            <Route path={"/home"} component={Home}/>
                            <Route exact path={"/view"} component={View}/>
                            <Route exact path="/wrong" component={Wrong} />
                            <Route path="/view/compare" component={Compare} />
                            <Route path="/view/myproduct" component={UserProduct} />
                            
                            <Route exact path="/after" component={AfterProduct} />
                            <Route exact path="/view/search" component={Search} />
                            <Route exact path="/view/login" component={Login} />
                            <Route exact path="/view/join" component={Join} />
                            <Route exact path="/view/user" component={UserMenu} />
                            <Route path="/" component={NotFound}/>
                        </Switch>
                    </BrowserRouter>
                </MediaContext.Provider>
            </LoginContext.Provider>
        </CookiesProvider>
    );
}
export default App;