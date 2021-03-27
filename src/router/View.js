import {Link} from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';

// CSS
import '../contents/css/View/View.css';

// Context
import {LoginContext} from '../App';

const View = () => {
    const loginWrapper = useRef(null);
    const { userInfo } = useContext(LoginContext);

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
                        <div className="user-wrapper"ref={loginWrapper}>
                            <div className="user-title">
                                <p>{userInfo.name}</p>
                                <Link to="/setting"><i className="material-icons">settings</i></Link>
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
                            <Link to="/login">로그인</Link>
                        </div>
                    </header>
                )
            }
            
            <section id="Main">
                <div id="search-wrapper">
                    <h1 id="title">상품의 주소를 입력해주세요</h1>
                    <Link to="/search" id="search-input-wrapper">
                        <div id="search-input-frame">
                            <p>상품의 주소를 입력해주세요.</p>
                        </div>
                    </Link>
                </div>
            </section>
            <div className="logoWrapper">
                <Link to="/">Sizelity.</Link>
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