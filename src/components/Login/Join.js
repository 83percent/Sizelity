import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';

// CSS
import '../../contents/css/Login/Join.css';

// Context
import {ServerContext} from '../../App';


const Join = ({history}) => {
    // Context
    const server = useContext(ServerContext);

    // Ref
    const resultWrapper = useRef(null); // "환영합니다."
    const alertWrapper = useRef(null);  // 상단 알림

    const welcomeRef = useRef(null);
    const rePwd = useRef(null);
    const joinData = useRef({
        uid : "",
        upwd : "",
        name : "",
        gender : "",
        terms : {
            service : false,
            privacy : false
        },
        alert : false
    })


    let gender = null;

    const event = {
        submitEvent : async function(data) {
            console.log(data);
            if(!this.checkJoinRule(data)) return false;
            // SUBMIT
            resultWrapper.current.classList.add("on");
            await axios({
                method : 'post',
                url : `${server}/account/signup`,
                withCredentials: true,
                data : data,
                timeout : 3000
            }).then(response => {
                switch(response.status) {
                    case 200 : {
                        resultWrapper.current.querySelector('.result-frame').classList.add("on");
                        setTimeout(() => {
                            history.replace('/login');
                        }, 1500);
                        break;
                    }
                    default : {}
                }
                
            }).catch(err => {
                resultWrapper.current.classList.remove("on");
                switch(err?.response?.status) {
                    case 400 : {
                        event.alertToggle(true, "시스템 오류가 발생하였습니다.\n 잠시뒤 다시 시도해주세요.");
                        break;
                    }
                    case 419 : {
                        event.alertToggle(true, "이미 가입된 이메일 입니다.");
                        break;
                    }
                    case 500 : {
                        event.alertToggle(true, "시스템 오류가 발생하였습니다.\n 잠시뒤 다시 시도해주세요.");
                        break;
                    }
                    default : {
                        event.alertToggle(true, "인터넷 연결을 확인해주세요.");
                        break;
                    }
                }
            });
        }, // submitEvent()
        genderChange : () => {
            if(gender) {
                for(const element of gender) {
                    if(element.checked) {
                        element.parentElement.classList.add("on");
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

        alertToggle : function(force, msg) {
            if(!alertWrapper.current) return;
            if(force === undefined) force = !alertWrapper.current.classList.contain('on');
            if(msg) alertWrapper.current.querySelector("p").innerHTML = msg;
            alertWrapper.current.classList.toggle("on",force);
        }, // alertToggle
        checkJoinRule : function({uid, upwd, name, gender, terms}) {
            // Check
            const isEmail = ((value) => {
                return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
            })(uid);
            if(!isEmail) {
                this.alertToggle(true, "이메일 형식을 확인해주세요.");
                return false;
            }
    
            const isPwd = ((value) => {
                return (/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(value);
            })(upwd);
            if(!isPwd) {
                this.alertToggle(true, "비밀번호 형식을 확인해주세요.");
                return false;
            }
            const isRePwd = (upwd === rePwd.current.value);
            if(!isRePwd) {
                this.alertToggle(true, "비밀번호가 서로 일치하지 않습니다.");
                return false;
            }
    
            const isName = ((value) => {
                return (value.length > 1 && value.length < 21)
            })(name);
            if(!isName) {
                this.alertToggle(true, "이름은 1~20자를 입력할 수 있습니다.");
                return false;
            }
            if(gender !== 'male' && gender !== 'female') {
                this.alertToggle(true, "성별을 선택해주세요.")
                return;
            }
            if(!terms.service || !terms.privacy) {
                this.alertToggle(true, "필수 약관에 동의해주세요.");
                return false;
            }
            return true;
        }, // checkJoinRule()
    }
    useEffect(() => {
        if(!gender) gender = document.querySelectorAll('input[type="radio"][name="gender"]');
    }, []);
    return (
        <section id="View-Join">
            <div className="result-wrapper" ref={resultWrapper}>
                <div className="loader-frame">
                    <div className="loader"></div>
                </div>
                <div className="result-frame" ref={welcomeRef}>
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
            <article>
                <form>
                    <div className="loginInfo-input-wrapper">
                        <h1>로그인 정보</h1>
                        <div className="input-frame">
                            <h2>이메일</h2>
                            <input type="email" className="en" placeholder="이메일" autoComplete="off" id="input-email" onChange={e => joinData.current.uid = e.target.value}/>
                        </div>
                        <div className="input-frame" style={{marginBottom: "0"}}>
                            <h2>비밀번호</h2>
                            <input type="password" placeholder="비밀번호" id="input-password" minLength="8" maxLength="25" onChange={e => joinData.current.upwd = e.target.value}/>
                        </div>
                        <p style={{marginBottom: "1rem"}}>영문 대소문자, 숫자, 특수문자 포함 8~20자</p>
                        <div className="input-frame">
                            <h2>비밀번호 확인</h2>
                            <input type="password" placeholder="비밀번호 확인" ref={rePwd} id="input-re-password" minLength="8" maxLength="25"/>
                        </div>
                    </div>
                    <div>
                        <h1>개인정보</h1>
                        <div className="input-frame" style={{marginBottom: "1rem"}}>
                            <h2>이름</h2>
                            <input type="text" placeholder="이름" id="input-first" autoComplete="off" onChange={e => joinData.current.name = e.target.value}/>
                        </div>
                        <div className="gender">
                            <label>
                                <p>남자</p>
                                <div className="dot"></div>
                                <input type="radio" name="gender" value="male" onClick={() => event.genderChange()} onChange={() => joinData.current.gender = "male"}/>
                            </label>
                            <label>
                                <p>여자</p>
                                <div className="dot"></div>
                                <input type="radio" name="gender" value="female" onClick={() => event.genderChange()} onChange={() => joinData.current.gender = "female"}/>
                            </label>
                        </div>
                    </div>
                    <div style={{marginTop: "1rem", marginBottom: "3rem"}}>
                        <h1>약관</h1>
                        <ul>
                            <li className="privacy-frame">
                                <label>
                                    <p>사이즈리티 서비스 이용약관 (필수)</p>
                                    <input type="checkbox" onClick={(e) => event.privacyEvent(e)} onChange={e => joinData.current.terms.service = e.target.checked}/>
                                </label>
                                <button type="button">
                                    <i className="material-icons">find_in_page</i>
                                </button>
                            </li>
                            <li className="privacy-frame">
                                <label>
                                    <p>개인정보 수집 및 이용동의 (필수)</p>
                                    <input type="checkbox" onClick={(e) => event.privacyEvent(e)} onChange={e => joinData.current.terms.privacy = e.target.checked}/>
                                </label>
                                <button type="button">
                                    <i className="material-icons">find_in_page</i>
                                </button>
                            </li>
                            <li className="privacy-frame">
                                <label>
                                    <p>프로모션 안내 메일 수신동의 (선택)</p>
                                    <input type="checkbox" onClick={(e) => event.privacyEvent(e)} onChange={e => joinData.current.alert = e.target.checked}/>
                                </label>
                                <button type="button">
                                    <i className="material-icons">find_in_page</i>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button type="button" onClick={() => event.submitEvent(joinData.current)}>
                        <i className="material-icons">check</i>
                    </button>
                </form>
            </article>
        </section>
    );
}
export default Join;