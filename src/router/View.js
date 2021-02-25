import {Link, Route, Switch} from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
// Only Use Sample Login Init setting
import LoginModule from '../contents/js/Login';


// CSS
import '../contents/css/View/View.css';

//Component
import Main from '../components/View/View_Main';
import AcountHelp from '../components/View/View_AccountHelp';

// Context
import {LoginContext} from '../App';


const View = () => {
    const loginWrapper = useRef(null);
    const {userInfo, setUserInfo} = useContext(LoginContext);

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
    const SampleUser = async () => {
        const login = new LoginModule();
        //const _changeInfo = login.__sample();
        const _changeInfo = await login.__sample();
        //if(userInfo !== _changeInfo) setUserInfo(_changeInfo);
        if(_changeInfo) setUserInfo(_changeInfo);
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
                        <div className="user-wrapper"ref={loginWrapper}>
                            <div className="user-title">
                                <p>{userInfo.name}</p>
                                <Link to="/view/user"><i className="material-icons">settings</i></Link>
                            </div>
                            <div className="user-btn-frame">
                                <Link to="/closet" style={{borderRight: "1px solid #dbdbdb"}}>나의 옷장</Link>
                                <Link to="/after">나중에 볼 상품</Link>
                            </div>
                        </div>
                    </header>
                ) : (
                    <header>
                        <i className="material-icons" onClick={() => toggleLoginWrapper(true)}>lock</i>
                        <div className="login-wrapper" ref={loginWrapper}>
                            <i className="material-icons">lock</i>
                            <p><b>자신의 계정</b>에 옷을 저장하고</p>
                            <p>언제, 어디서든 꺼내어 비교하세요.</p>
                            <button onClick={() => SampleUser()}>샘플로그인</button>
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