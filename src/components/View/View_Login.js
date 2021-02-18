import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// JS
import Login from '../../contents/js/Login';

// CSS
import '../../contents/css/View/View_Login.css';

const ViewLogin = ({history}) => {
    useEffect(() => {
        if(!form.input.class) form.input.class = document.querySelectorAll("input.user-input");
        if(!form.submit.frame) form.submit.button = document.getElementById("submit-btn");
        if(!form.input.id) form.input.id = document.getElementById("user-input-id");
        if(!form.input.password) form.input.password = document.getElementById("user-input-password");
        form.submit.setDisabled();
    });
    return (
        <section className="View-login">
            <div className="Login-backFrame" onClick={() => history.goBack()}>
                <i className="material-icons">arrow_back</i>
            </div>
            <article>
                <form id="loginForm">
                    <div className="input-wrapper">
                        <input type="text" className="user-input" id="user-input-id" name="email" placeholder="전화번호 또는 이메일" onChange={(e) => form.input.changeInputEvent(e)}/>
                        <input type="password" className="user-input" id="user-input-password" name="password" placeholder="비밀번호" onChange={(e) => form.input.changeInputEvent(e)}/>
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

const login = {
    loginEvent : function(e) {
        const id = form.input.id.value;
        const password = form.input.password.value;

        const _login = new Login();
        _login.send(id, password);
    }
}
const form = {
    input : {
        class : null,
        id : null,
        password : null,
        changeInputEvent : function(e) {
            let pass = (e.target.value.length > 7);
            if(pass) {
                // length : ~8
                e.target.classList.add("on");    
                if(form.submit.button.disabled) form.submit.setDisabled();
            } else {
                // length : 7~
                e.target.classList.remove("on");
                if(!form.submit.button.disabled) form.submit.setDisabled();
            }
        },
        setWrong : function() {
            
        }
    },
    submit : {
        button : null,
        setDisabled : function(bool) {
            if(bool === undefined) {
                // 어떠한 @param 도 주어지지 않았을 경우 직접 온, 오프 결정
                let pass = true;
                for(let index = 0; index < form.input.class.length; index++) {
                    pass *= form.input.class[index].value.length > 7;
                }
                this.button.disabled = Boolean(!pass);
            } else {
                // 특정 동작행위를 알리는 @param 들이 있음.
                if(this.button.disabled !== bool) this.button.disabled = bool;
            }
        } // form.submit.disabled()
    }
}

export default ViewLogin;