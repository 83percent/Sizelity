// Module
import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginModule from './contents/js/Login';

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
import Wrong from './router/Wrong';
import Login from './components/View/View_Login';
import Join from './components/View/View_Join';
import Search from './components/View/View_Search';
import UserMenu from './components/View/View_User_Menu';

import Test from './router/Test';

export const MediaContext = React.createContext("Phone");
export const LoginContext = React.createContext(null);

let login = null;
function App() {
  if(!login) login = new LoginModule();
  //const [userInfo, setUserInfo] = useState(login.get());
  // Axios 테스트 코드
  const [userInfo, setUserInfo] = useState(null);
  const media = (() => {
      return window.screen.width > 1024 ? "Desktops" : "Phone";
  })();
  return (
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
  );
}

export default App;