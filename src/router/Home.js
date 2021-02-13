import { Link, NavLink, Route, Switch } from "react-router-dom";

// CSS
import "../contents/css/Home.css";

//JS
import Open from '../contents/js/ServiceOpen';

// Component
import Main from '../components/Main';
import HomeLogin from '../components/Home_Login';
import Join  from '../components/Join';
import { useRef } from "react";


const Home = (props) => {

    console.log("Home JS RE - render");
    setThemeColor();

    // Hooks
    const slider = useRef(null);

    // Function
    const isHome = () => props.location.pathname === '/home' || props.location.pathname === '/'  ? false : true;
    const sliderToggle = () => {
        const slider =  document.getElementById("Home-slider");
        slider.classList.contains("off") ? slider.classList.replace("off", "on") : slider.classList.replace("on", "off");
    }
    let isNavOpenToggle = isHome();
    return (
        <div id="Home">
            <nav>
                <Link id="Home-title" to="/home">Sizelity.</Link>
                <div id="nav-menu">
                    <NavLink to="/home/what">What</NavLink>
                    <NavLink to="/home/how">How</NavLink>
                    <NavLink to="/home/partner">Partner</NavLink>
                    <NavLink to="/home/help">Help</NavLink>
                </div>
                <div className="nav-menu-user">
                    <button className={`Home-openBtn ${isNavOpenToggle ? "on" : "off"}`} onClick={() => {Open()}}>Open</button>
                    <button className="Home-loginBtn" onClick={() => sliderToggle()}>Sign in</button>
                </div>
            </nav>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/home" component={Main} />
                <Route path="/home/join">
                    <Join
                        sliderRef={slider} />
                </Route>
            </Switch>
            <div id="Home-slider" ref={slider} className="off">
                <HomeLogin />
            </div>
        </div>
    )
}
export default Home;

const setThemeColor = () => {
    const themeColor = "#232526";
    if(document.querySelector("meta[name='theme-color']").content !== themeColor) {
        document.querySelector("meta[name='theme-color']").content = themeColor;
    }
}