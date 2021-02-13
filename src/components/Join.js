import Proptype from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// CSS
import '../contents/css/Join.css';

const Join = ({sliderRef}) => {
    sliderClose(sliderRef); // Login slider가 열려있으면 닫음
    useEffect(() => {
        const welcomeFrame = document.getElementById("welcome-frame");
        const nextFrame = document.getElementById("inner-wrapper");
        welcome(welcomeFrame, nextFrame,1300);
    },[]);

    useEffect(() => {
        privacy.privacyAll = document.getElementById("privacy-all");
        privacy.privacyArr = document.getElementById("privacy-list").querySelectorAll("input[type='checkbox']");
        
        // EventListener
        genderOptionChange();
    });
    return (
        <section id="Join">
            <div id="welcome-frame">
                <p>환영합니다.</p>
            </div>
            <div id="inner-wrapper">
                <i className="material-icons" onClick={(e) => closeTrigger(e)}>close</i>
                <Link to="/home" id="moveToHome" replace={true}/>
                <form>
                    <div className="inner-frame">
                        <label htmlFor="userid">이메일<p>(필수)</p></label>
                        <input type="text" autoComplete="off" id="userid" className="self-input" placeholder="example@xxxxxx.com"/>
                    </div>
                    <div className="inner-frame">
                        <label htmlFor="userpw">비밀번호<p>(필수)</p></label>
                        <input type="password" className="self-input" id="userpw" placeholder="비밀번호"/>
                        <input type="password" className="self-input" id="userrepw" placeholder="비밀번호 재확인"/>
                        <p className="rule"></p>
                    </div>
                    <div className="inner-frame">
                        <div className="label">
                            <h3>옵션</h3>
                            <p>(선택)</p>
                        </div>
                        <div id="gender-option-frame" className="option-frame">
                            <label className="gender-option">
                                <input type="radio" name="gender" value="man"/>
                                <p>남자</p>
                            </label>
                            <label className="gender-option">
                               <input type="radio" name="gender" value="woman"/>
                               <p>여자</p>
                            </label>
                            <label className="on">
                                <input type="radio" name="gender" value="none"/>
                                <p>선택안함</p>
                            </label>
                        </div>
                        <div className="option-frame">

                        </div>
                    </div>
                    <div id="privacy-wrapper">
                        <h3>이용약관</h3>
                        <div id="privacy-frame">
                            <div className="privacy-element">
                                <label id="privacy-all" className="" onClick={(e)=> privacy.allClickEvent(e.target)}>
                                    <h3>이용약관에</h3>
                                    <h3 className="s">전체동의</h3>
                                </label>
                            </div>
                            <ul id="privacy-list">
                                <li className="privacy-element">
                                    <label className="off">
                                        <h3>사이즈리티 서비스 이용약관 동의</h3>
                                        <p>(필수)</p>
                                        <input type="checkbox" onChange={(e) => privacy.elementClickEvent(e.target)}/>
                                        <div className="dot-frame">
                                            <div className="dot"></div>
                                        </div>
                                    </label>
                                    <button>보기</button>
                                </li>
                                <li className="privacy-element">
                                    <label className="off">
                                        <h3>개인정보 수집 및 이용동의</h3>
                                        <p>(필수)</p>
                                        <input type="checkbox" onChange={(e) => privacy.elementClickEvent(e.target)}/>
                                        <div className="dot-frame">
                                            <div className="dot"></div>
                                        </div>
                                    </label>
                                    <button>보기</button>
                                </li>
                                <li className="privacy-element">
                                    <label className="off">
                                        <h3>프로모션 안내 메일 수신동의</h3>
                                        <p>(선택)</p>
                                        <input type="checkbox" onChange={(e) => privacy.elementClickEvent(e.target)}/>
                                        <div className="dot-frame">
                                            <div className="dot"></div>
                                        </div>
                                    </label>
                                    <button>보기</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="submit-frame">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </section>
    );
}
const sliderClose = (sliderRef) => {
    try {
        const listArr = sliderRef.current.classList;
        if(listArr.contains("on")) listArr.replace("on","off");
    } catch(e) {}
}
const genderOptionChange = () => {
    const genderArr = document.getElementById("gender-option-frame").querySelectorAll("input[type='radio']");
        genderArr.forEach(element => {
            element.addEventListener("change", () => {
                genderArr.forEach(e => {
                    if(e.checked) {
                        e.parentElement.classList.add("on");
                    } else {
                        e.parentElement.classList.remove("on");
                    }
                });
            });
        });
}
const welcome = (welcomeframe, nextFrame,time) => {
    try {
        setTimeout( ()=> {
            welcomeframe.classList.add("on");
            setTimeout(()=> {
                welcomeframe.classList.remove("on");
                setTimeout(() => {
                    welcomeframe.style.display="none";
                    nextFrame.style.display="flex";
                    nextFrame.classList.add("on");
                },700);
            },200+time);
        },200);
    } catch(e) {}
}

const closeTrigger = (e) => {
    let real = window.confirm("해당화면을 벗어나면 입력한 정보가 모두 지워집니다.");
    if(real) {
        e.target.disabled = true;
        setTimeout(() => {
            document.getElementById("inner-wrapper").classList.remove("on");
        }, 300);
        setTimeout(() => {
            document.getElementById("moveToHome").click();
        },1100);
    }
    
    
}

const privacy = {
    privacyAll : null,
    privacyArr : null,
    allClickEvent : (e) => {
        privacy.privacyArr.forEach(element => {
            element.checked = true;
            privacy.elementClickEvent(element,true);
        });
        e.classList.add("on");
    },
    elementClickEvent : (element, bool) => {
        let parent = element.parentElement.classList;
        if(bool) {
            parent.replace("off","on");
        } else {
            element.checked ? parent.replace("off","on") : parent.replace("on","off");
            privacy.checkAll();
        }
    },
    checkAll : () => {
        for(let element of privacy.privacyArr) {
            if(!element.checked) {
                privacy.privacyAll.classList.remove("on");
                return;
            }
            privacy.privacyAll.classList.add("on");

        }
    }
}

Join.proptype = {
    sliderRef: Proptype.object.isRequired
}


export default Join;