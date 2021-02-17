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

const loginInfo = {
  code : "UA0001",
  name : "string",
  id : "hoonni2709@naver.com"
}

export const MediaContext = React.createContext("Phone");
export const LoginContext = React.createContext(null);
function App() {
  const user = (() => {
      return window.screen.width > 1024 ? "Desktops" : "Phone";
  })();
  return (
    <LoginContext.Provider value={loginInfo}>
      <MediaContext.Provider value={user}>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route path={"/home"} component={Home}/>
            <Route exact path={"/view"} component={View}/>
            <Route exact path="/view/compare" component={Compare} />
            <Route path="/" component={NotFound}/>
          </Switch>
          <div id="ad"></div>
        </BrowserRouter>
      </MediaContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;