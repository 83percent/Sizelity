import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';

import AccountModule from '../../contents/js/Account';

// CSS
import '../../contents/css/Login/Login.css';

// Context
import {LoginContext, ServerContext} from '../../App';

let accountModule = null;
const ViewLogin = ({history}) => {
    // Ref
    const alertWrapper = useRef(null);
    const alertText = useRef(null);
    const email = useRef(null);
    const pwd = useRef(null);
    
    // Context
    const {userInfo, setUserInfo} = useContext(LoginContext);
    const server = useContext(ServerContext);
    
    // Field
    let submitBtn = null;
    if(userInfo && userInfo._id) {
        // 로그인 되어있음.
        history.replace("/");
        return null;
    }
    

    const login = {
        loginEvent : async (e) => {
            const __id = email.current.value;
            const toggleWrong = (target, force) => target.current.classList.toggle("wrong",force);
            const isEmail = ((value) => {
                return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
            })(__id);
            if(isEmail) toggleWrong(email,false);
            else {
                toggleWrong(email,true);
                return false;
            }
            const __password = pwd.current.value;
            const isPwd = ((value) => {
                return (/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(value);
            })(__password);
            if(isPwd) toggleWrong(pwd,false);
            else {
                toggleWrong(pwd,true);
                return false;
            }

            if(!accountModule) accountModule = new AccountModule(server);
            event.disabled(true, e.target);
            const result = await accountModule.login({username : __id, password : __password});
            if(result?.type === 'success') {
                setUserInfo(result.data);
                history.replace("/");
                return null;
            } else {
                event.openAlert(result.msg);
            }
        }
    }
    const event = {
        alertToggle : function() {
            
        },
        closeAlert : function() {
            if(!alertWrapper.current) return;
            alertWrapper.current.classList.remove("on");
        },
        openAlert : function(Msg) {
            if(!alertWrapper.current) return;
            alertText.current.innerHTML = Msg;
            this.disabled(false)
            alertWrapper.current.classList.add("on");
        },
        disabled : function(force, submit) {
            if(!alertWrapper.current) return;
            alertWrapper.current.classList.toggle("ready",force);
            if(!submitBtn) submitBtn = submit;
            submitBtn.disabled = force;
            email.current.disabled = force;
            pwd.current.disabled = force;
        }
    }
    return (
        <section id="View-login">
            <div className="alert-wrapper" ref={alertWrapper}>
                <div className="alert-frame">
                    <p ref={alertText}></p>
                </div>
                <div className="blank" onTouchStart={() => event.closeAlert()}></div>
            </div>
            <div className="Login-backFrame" onClick={() => history.goBack()}>
                <i className="material-icons">arrow_back</i>
            </div>
            <article>
                <form id="loginForm">
                    <div className="input-wrapper">
                        <input type="email" ref={email} className="user-input" id="user-input-id" placeholder="이메일" />
                        <input type="password" ref={pwd} className="user-input" id="user-input-password" placeholder="비밀번호" />
                    </div>
                </form>
                <div className="submit-wrapper">
                    <button id="submit-btn" onClick={(e) => login.loginEvent(e)}>로그인</button>
                </div>
                <div className="login-option-wrapper">
                    <Link id="join-btn" to="/login/join">
                        <h4>계정이 없으신가요?</h4>
                        <h2>회원가입</h2>
                    </Link>
                </div>
                <div className="line"><div></div></div>
                <div className="login-option-wrapper">
                    <Link to="/help">
                        <h4>도움이 필요한가요?</h4>
                    </Link>
                </div>
            </article>
            <footer>

            </footer>
        </section>
    )
}
export default ViewLogin;