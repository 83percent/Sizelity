import {Link, Route, Switch} from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';

// CSS
import '../contents/css/View/View.css';

//Component
import Main from '../components/View/View_Main';
import AcountHelp from '../components/View/View_AccountHelp';

// Context
import {LoginContext} from '../App';


const View = (props) => {
    const loginWrapper = useRef(null);
    const userInfo = useContext(LoginContext);

    const toggleLoginWrapper = (force) => {
        if(force === undefined) loginWrapper.current.classList.toggle("active");
        else {
            if(loginWrapper.current) {
                loginWrapper.current.classList.toggle("active",force);
                if(force) {
                    setTimeout(() => {toggleLoginWrapper(false);},3000);
                }
            }
        }
    }
    useEffect(() => {
        if(loginWrapper.current && !userInfo) toggleLoginWrapper(true);
    });
    useEffect(() => {
        setThemeColor();
    },[]);

    return (
        <div id="View">
            {
                userInfo ? (
                    <header>
                        <i className="material-icons" onClick={() => toggleLoginWrapper(true)}>account_circle</i>
                        <div className="login-wrapper" ref={loginWrapper}>
                            <i className="material-icons">account_circle</i>
                            <p><b>{userInfo.name}</b></p>
                            <p>언제, 어디서든 꺼내어 비교하세요.</p>
                            <Link to="/view/login">로그인</Link>
                        </div>
                    </header>
                ) : (
                    <header>
                        <i className="material-icons" onClick={() => toggleLoginWrapper(true)}>lock</i>
                        <div className="login-wrapper" ref={loginWrapper}>
                            <i className="material-icons">lock</i>
                            <p><b>자신의 계정</b>에 옷을 저장하고</p>
                            <p>언제, 어디서든 꺼내어 비교하세요.</p>
                            <Link to="/view/login">로그인</Link>
                        </div>
                    </header>
                )
            }
            
            <Switch>
                <Route exact path="/view" component={Main}/>
                <Route exact path="/view/accounthelp" component={AcountHelp} />
                <Route path="/view" component={Main} />
            </Switch>
            <div className="logoWrapper">
                <Link to="/view">Sizelity.</Link>
            </div>
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