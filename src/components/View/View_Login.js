import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';

// JS
import LoginModule from '../../contents/js/Login';

// CSS
import '../../contents/css/View/View_Login.css';

// Context
import {LoginContext} from '../../App';

const ViewLogin = ({history, location}) => {
    const email = useRef(null);
    const pwd = useRef(null);

    const {setUserInfo} = useContext(LoginContext);
    const login = {
        loginEvent : async (e) => {
            const toggleWrong = (target, force) => target.current.classList.toggle("wrong",force);
            const isEmail = ((value) => {
                return (/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
            })(email.current.value);
            if(isEmail) toggleWrong(email,false);
            else {
                toggleWrong(email,true);
                return false;
            }
            const isPwd = ((value) => {
                return (/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(value);
            })(pwd.current.value);
            if(isPwd) toggleWrong(pwd,false);
            else {
                toggleWrong(pwd,true);
                return false;
            }
            const __id = email.current.value;
            const __password = pwd.current.value;

            const loginModule = new LoginModule();
            const result = await loginModule.send(__id,__password);
            console.log(result);
            if(result.name) {
                setUserInfo(result);
                history.goBack();
            }
        }
    }

    return (
        <section className="View-login">
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
                    <Link id="join-btn" to="/view/join">
                        <h4>계정이 없으신가요?</h4>
                        <h2>가입하기</h2>
                    </Link>
                </div>
                <div className="line"><div></div></div>
                <div className="login-option-wrapper">
                    <Link to="/view/accounthelp">
                        <h4>비밀번호를 잊으셨나요?</h4>
                    </Link>
                </div>
            </article>
            <footer>

            </footer>
        </section>
    )
}
export default ViewLogin;