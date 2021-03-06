import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';

// JS
import LoginModule from '../../contents/js/Login';

// CSS
import '../../contents/css/View/View_Login.css';

// Context
import {LoginContext} from '../../App';
let loginModule = null;
let loginObject = {uid:undefined, upwd:undefined};
const ViewLogin = ({history}) => {
    const alertWrapper = useRef(null);
    const alertText = useRef(null);
    let submitBtn = null;

    const email = useRef(null);
    const pwd = useRef(null);

    const {userInfo, setUserInfo} = useContext(LoginContext);
    console.log(userInfo);
    useEffect(() => {
        if(userInfo && userInfo._id) {
            // 로그인 되어있음.
            history.replace("/wrong");
        }
    }, []);
    const alertMessage = {
        NetWorkError : "네트워크 오류",
        WrongError : "이메일 또는 비밀번호를 확인해주세요.",
        ServerError : "잠시 후 시도해주세요."
    }   

    const login = {
        loginEvent : async (e) => {
            const __id = email.current.value;
            const toggleWrong = (target, force) => target.current.classList.toggle("wrong",force);
            const isEmail = ((value) => {
                return (/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
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

            if(!loginModule) loginModule = new LoginModule();
            loginObject.uid = __id;
            loginObject.upwd = __password;


            event.disabled(true, e.target);
            const result = await loginModule.send(loginObject);
            if(!email.current) return; // 페이지 벗어남.

            if(result.name) {
                setUserInfo(result);
                history.goBack();
            } else {
                // 로그인 실패
                if(result === false) {
                    // 서버로의 전송 전 데이터 검증 과정에서 걸 림.
                    /*
                        - 발생 요인
                        1. 프런트 코딩 단계 : Component 에서 Login 라이브러리로 전송하는 데이터의 형식을 봐야할 듯.
                    */
                   event.openAlert(alertMessage.NetWorkError);
                } else if(result.status) {
                    switch(result.status) {
                        case -200 : {
                            // 서버와의 통신중에 문제가 생김
                            event.openAlert(alertMessage.ServerError);
                            break;
                        }
                        case -404 : {
                            // 서버에 형식에 맞지않는 데이터를 전송
                            /*
                                - 발생 요인
                                1. 프런트 코딩단계 : 서버에서 처리하는 데이터와 프런트의 데이터 형식을 맞추지 않고 처리했는지 확인
                                2. 백엔드 코딩단계 : 서버에서의 처리과정 중 일치하지 않는 데이터를 처리하는지 확인
                                3. 보안단계 : 악의적인 코드 주입을 통한 일치 하지 않는 데이터 주입
                                        -> 서버 전송 전 데이터 검증 과정을 거치나, 1,2번 문제가 아닌 경우 우회적으로 데이터 주입.
                             */
                            event.openAlert(alertMessage.ServerError);
                            break;
                        }
                        case 404 : {
                            event.openAlert(alertMessage.WrongError);
                            break;
                        }
                        default : {
                            event.openAlert(alertMessage.ServerError);
                        }
                    }
                }
            }
        }
    }
    const event = {
        closeAlert : function() {
            if(!alertWrapper.current) return;
            alertWrapper.current.classList.remove("on");
        },
        openAlert : function(Msg) {
            this.setText(Msg);
            if(!alertWrapper.current) return;
            this.disabled(false)
            alertWrapper.current.classList.add("on");
        },
        setText : function(Msg) {
            console.log(Msg);
            if(!alertText) return;
            alertText.current.innerHTML = Msg;
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