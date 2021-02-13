// Module
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

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route path={"/home"} component={Home}/>
        <Route exact path={"/view"} component={View}/>
        <Route exact path="/view/compare" component={Compare} />
        <Route path="/" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;