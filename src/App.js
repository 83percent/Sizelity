// Module
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Style
import './contents/css/App.css';
import './contents/fonts/Montserrat_use.css';
import './contents/fonts/NotoSans.css';

// Component
import Home from './router/Home';
import View from './router/View';
import Compare from './router/View_Compare';
import NotFound from './router/NotFound';
import Login from './components/View/View_Login';
import Join from './components/View/View_Join';
import Search from './components/View/View_Search';




export const MediaContext = React.createContext("Phone");
export const LoginContext = React.createContext(null);
function App() {
  const loginInfo1 = {
    code : "UA0001",
    name : "string",
    id : "hoonni2709@naver.com"
  }
  const loginInfo2 = null;
  const user = (() => {
      return window.screen.width > 1024 ? "Desktops" : "Phone";
  })();
  return (
    <LoginContext.Provider value={loginInfo2}>
      <MediaContext.Provider value={user}>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/home"} component={Home}/>
            <Route exact path={"/view"} component={View}/>
            <Route path="/view/compare" component={Compare} />
            <Route exact path="/view/search" component={Search} />
            <Route exact path="/view/login" component={Login} />
            <Route exact path="/view/join" component={Join} />
            <Route path="/" component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </MediaContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;