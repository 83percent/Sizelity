import { Link } from 'react-router-dom';
import { useState } from 'react';

// CSS
import '../contents/css/Home_Login.css';
/*
@params setOpenSlider() : 작동
*/

let slider = null;

const Login = () => {
    // 아이디 저장 State
    const [saveToggle, setSaveToggle] = useState(false);
    const saveCheckEvent = (e) => {
        setSaveToggle(e.target.checked);
    }

    // 슬라이더 닫기 기능 버튼
    const sliderClose = () => {
        if(!slider) slider = document.getElementById("Home-Login").parentElement;

        let isOpen = slider.classList.contains("on");
        if(isOpen) slider.classList.replace("on", "off");
    }

    // Input 활성화/비활성화 : 닫기 버튼이 여러개라 복잡해짐. -> state 써야하는데 그럼 또 꼬임
    return (
        <div id="Home-Login">
            <header>
                <h1>LOGIN</h1>
                <i className="material-icons" onClick={() => sliderClose()}>keyboard_arrow_down</i>
            </header>
            <section>
                <form method="post" action="">
                    <div className="Home-userInput">
                        <label htmlFor="Home-username">USER ID</label>
                        <input type="text" id="Home-username" placeholder="example@xxx.com" autoComplete="off"/>
                    </div>
                    <div className="Home-userInput">
                        <label htmlFor="Home-userpass">PASSWORD</label>
                        <input type="password" id="Home-userpass" placeholder="..." />
                    </div>
                    <input id="Home-submit" type="submit" value="Sign in" />
                    <div className="Home-inputSaveFrame">
                        <label htmlFor="Home-inputSave" className={saveToggle ? "on" : "off"}>
                            <div></div>
                            <p>로그인 상태 유지</p>
                        </label>
                        <input type="checkbox" id="Home-inputSave" onChange={(e) => {saveCheckEvent(e)}}/>
                    </div>
                </form>
                <div className="Home-option-frame">
                    <div>
                        <i className="material-icons">vpn_key</i>
                        <Link to="/">비밀번호를 잊으셨나요?</Link>
                    </div>
                    <div>
                        <i className="material-icons">add</i>
                        <Link to="/home/join">회원가입</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;