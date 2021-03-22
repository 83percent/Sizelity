import axios from 'axios';
import { useEffect, useRef } from 'react';
import '../../contents/css/Login/Join.css';
//const URL = "http://localhost:3001/user/signup"; // Local
//const URL = "http://172.30.1.31:3001/user/signup"; // Cafe
//const URL = "http://192.168.11.2:3001/user/signup"; // Home
const URL = "http://3.36.87.114:3001/user/signup"; // server


const Join = ({history}) => {
    // Ref
    const resultWrapper = useRef(null); // "환영합니다."
    const alertWrapper = useRef(null);  // 상단 알림

    const email = useRef(null);
    const pwd = useRef(null);
    const rePwd = useRef(null);
    const name = useRef(null);

    let gender = null;
    let genderSelect = 'not';
    let privacy = null;

    const event = {
        submitEvent : () => {
            if(!checkRule()) return false;
            const account = {
                uid : email.current.value,
                upwd : pwd.current.value,
                name : name.current.value,
                gender : genderSelect,
                privacy : true,
                alert : privacy[2].checked
            }
            console.log(account);
            
            // SUBMIT
            ( async () => {
                try {
                    resultWrapper.current.classList.add("on");
                    const result = await axios({
                        method : 'post',
                        url : URL,
                        data : account,
                        timeout : 3000
                    });
                    console.log("응답 결과 : ", result.data);
                    switch(result.data.status) {
                        case 200 : {
                            // Success
                            resultWrapper.current.querySelector('.result-frame').classList.add("on");
                            setTimeout(() => {
                                history.replace('/view/login');
                            }, 1500);
                            break;   
                        }
                        case 0 : {
                            // already Email
                            event.alertToggle(true, "이미 가입된 이메일 입니다.");
                            resultWrapper.current.classList.remove("on");
                            break;
                        }
                        case -404 : {
                            // invalid Data
                            event.alertToggle(true, "시스템 오류가 발생하였습니다.");
                            resultWrapper.current.classList.remove("on");
                            break;
                        }
                        case -200 : {
                            event.alertToggle(true, "시스템 오류가 발생하였습니다.\n 잠시뒤 다시 시도해주세요.");
                            resultWrapper.current.classList.remove("on");
                            break;
                        }
                        default : {
                            event.alertToggle(true, "시스템 오류가 발생하였습니다.");
                            resultWrapper.current.classList.remove("on");
                        }
                    }
                } catch {
                    event.alertToggle(true, "네트워크 연결을 확인해주세요.");
                    resultWrapper.current.classList.remove("on");
                }
            })();

        }, // submitEvent()
        genderChange : () => {
            if(gender) {
                for(const element of gender) {
                    if(element.checked) {
                        element.parentElement.classList.add("on");
                        genderSelect = element.value;
                    } else {
                        element.parentElement.classList.remove("on");
                    }
                }
            }
        }, // genderChange

        privacyEvent : (e) => {
            const target = e.target;
            if(target.checked) target.parentElement.classList.add("on");
            else target.parentElement.classList.remove("on");
        }, // Privacy Event

        alertToggle : (force, msg) => {
            if(!alertWrapper.current) return;
            if(force === undefined) force = !alertWrapper.current.classList.contain('on');
            if(msg) alertWrapper.current.querySelector("p").innerHTML = msg;
            alertWrapper.current.classList.toggle("on",force);
        } // alertToggle
    }
    const checkRule = () => {
        // Check
        const toggleWrong = (target, force) => target.current.classList.toggle("wrong",force);
        const isEmail = ((value) => {
            return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
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
        const isRePwd = (pwd.current.value === rePwd.current.value);
        if(isRePwd) toggleWrong(rePwd,false);
        else { 
            toggleWrong(rePwd,true);
            return false;
        }

        const isName = ((value) => {
            return (value.length > 1 && value.length < 25)
        })(name.current.value);
        if(isName) toggleWrong(name,false);
        else {
            toggleWrong(name,true);
            return false;
        }

        if(privacy) {
            if(privacy[0].checked && privacy[1].checked) {
                return true;
            } else {
                alert("필수 약관에 동의해주세요.");
                return false;
            }
        }
    }
    useEffect(() => {
        if(!gender) gender = document.querySelectorAll('input[type="radio"][name="gender"]');
        if(!privacy) privacy = document.querySelectorAll('.privacy-wrapper input[type="checkbox"]');
    }, []);
    return (
        <section id="View-Join">
            <div className="result-wrapper" ref={resultWrapper}>
                <div className="loader-frame">
                    <div className="loader"></div>
                </div>
                <div className="result-frame">
                    <h1>환영합니다</h1>
                </div>
            </div>
            <div className="alert-wrapper" ref={alertWrapper}>
                <div className="alert-frame"><p></p></div>
                <div className="blank" onTouchStart={() => event.alertToggle(false)}></div>
            </div>
            <header>
                <div className="Login-backFrame" onClick={() => history.goBack()}>
                    <i className="material-icons">arrow_back</i>
                </div>
                <h2>회원가입</h2>
            </header>
            <article className="bottom">
                <form>
                    <div style={{flexGrow : 1}}>
                        <ul>
                            <li className="title-wrapper">
                                <h1>로그인 정보</h1>
                            </li>
                            <li className="input-wrapper">
                                <input type="email" placeholder="이메일 (E-Mail)" ref={email} autoComplete="off" id="input-email"/>
                            </li>
                            <li className="input-wrapper">
                                <input type="password" placeholder="비밀번호 (Password)" ref={pwd} id="input-password" minLength="8" maxLength="25"/>
                            </li>
                            <li className="input-wrapper">
                                <input type="password" placeholder="비밀번호 확인 (Re-Password)" ref={rePwd} id="input-re-password" minLength="8" maxLength="25"/>
                            </li>
                            <p>영문 대소문자, 숫자, 특수문자 포함 8~20자</p>
                        </ul>
                        <ul>
                            <li className="title-wrapper">
                                <h1>개인정보</h1>
                            </li>
                            <li className="input-wrapper">
                                <input type="text" placeholder="이름" id="input-first" ref={name} autoComplete="off"/>
                            </li>
                            <li className="input-wrapper">
                                <label>
                                    <p>남자</p>
                                    <div className="dot"></div>
                                    <input type="radio" name="gender" value="male" onClick={() => event.genderChange()}/>
                                </label>
                                <label>
                                    <p>여자</p>
                                    <div className="dot"></div>
                                    <input type="radio" name="gender" value="female" onClick={() => event.genderChange()}/>
                                </label>
                                <label className="on">
                                    <p>비공개</p>
                                    <div className="dot"></div>
                                    <input type="radio" name="gender" value="not" defaultChecked onClick={() => event.genderChange()}/>
                                </label>
                            </li>
                        </ul>
                        <ul>
                            <li className="title-wrapper">
                                <h1>약관</h1>
                            </li>
                            <li className="privacy-wrapper">
                                <label>
                                    <p>사이즈리티 서비스 이용약관 (필수)</p>
                                    <input type="checkbox" onClick={(e) => event.privacyEvent(e)}/>
                                </label>
                                <button type="button">
                                    <i className="material-icons">assignment</i>
                                </button>
                            </li>
                            <li className="privacy-wrapper">
                                <label>
                                    <p>개인정보 수집 및 이용동의 (필수)</p>
                                    <input type="checkbox" onClick={(e) => event.privacyEvent(e)}/>
                                </label>
                                <button type="button">
                                    <i className="material-icons">assignment</i>
                                </button>
                            </li>
                            <li className="privacy-wrapper">
                                <label>
                                    <p>프로모션 안내 메일 수신동의 (선택)</p>
                                    <input type="checkbox" onClick={(e) => event.privacyEvent(e)}/>
                                </label>
                                <button type="button">
                                    <i className="material-icons">assignment</i>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="submit-wrapper">
                        <button type="button" onClick={() => event.submitEvent()}>가입하기</button>
                    </div>
                </form>
            </article>
        </section>
    );
}
export default Join;