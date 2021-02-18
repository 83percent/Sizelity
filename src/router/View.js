import { NavLink ,Link, Route, Switch } from 'react-router-dom';

// CSS
import '../contents/css/View/View.css';

//Component
import Main from '../components/View/View_Main';
import AcountHelp from '../components/View/View_AccountHelp';

const acceptLogo = [
    "/view",
    "/view/login",
    //"/view/compare"
];
const View = (props) => {
    
    setThemeColor();

    let logoToggle = false;
    for(const path of acceptLogo) {
        if(props.location.pathname === path) {
            logoToggle = true;
            break;
        }
    }
    return (
        <div id="View">
            <nav id="View-Main-Nav">
                <Link to="/view" className={logoToggle ? "on" : "off"}>Sizelity.</Link>
                <div id="nav-menu">
                    <NavLink to="/view/login" id="View-loginBtn">
                        <p>Login.</p>
                        
                    </NavLink>
                </div>
            </nav>
            <Switch>
                <Route exact path="/view" component={Main}/>
                <Route exact path="/view/accounthelp" component={AcountHelp} />
                <Route path="/view" component={Main} />
            </Switch>
        </div>
    );
}
export default View;



const setThemeColor = () => {
    const themeColor = "#f0f2f5";
    if(document.querySelector("meta[name='theme-color']").content !== themeColor) {
        document.querySelector("meta[name='theme-color']").content = themeColor;
    }
}