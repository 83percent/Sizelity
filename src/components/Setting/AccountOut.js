import axios from "axios";
import { useContext, useRef, useState } from "react";
import { ServerContext } from "../../App";
import LoginModule from '../../contents/js/Login';

// Context
import {LoginContext} from '../../App';

let login = null;
const AccountOut = ({history}) => {
    // State
    const [loader, setLoader] = useState(false);
    const [option, setOption] = useState(null);

    // Ref
    const alertWrapper = useRef(null);
    const password = useRef(null);
    const suggestInput = useRef(null);

    // Context
    const server = useContext(ServerContext);
    const {userInfo ,setUserInfo} = useContext(LoginContext);

    
    if(!userInfo)  {
        history.replace("/notlogin");
        return null;
    }

    const event = {
        alertToggle : (force, text) => {
            if(!alertWrapper.current) return;
            if(force === undefined) force = !alertWrapper.current.classList.contains("on");
            if(force) {
                if(text !== undefined) alertWrapper.current.querySelector("h1").innerHTML = text;
            }
            alertWrapper.current.classList.toggle("on",force);
        }, // alertToggle
        outOfAccount : async () => {
            if(!password.current.value) {
                event.alertToggle(true,"비밀번호를 입력해주세요.");
                return;
            }
            if(!(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(password.current.value)) {
                event.alertToggle(true,"형식에 맞지 않는 비밀번호 입니다.");
                return;
            }
            if(!option) {
                event.alertToggle(true,"탈퇴 사유를 선택해주세요.");
                return;
            }
            if(option === 'other') {
                if(suggestInput.current.value.length < 3) {
                    event.alertToggle(true,"탈퇴 사유를 선택해주세요.");
                    return;
                }
            }
            const response = await axios({
                method: 'DELETE',
                url: `${server}/user`,
                withCredentials: true,
                data : {
                    password : password.current.value,
                    option: option,
                    suggest: option === 'other' ? suggestInput.current.value : undefined
                },
                timeout: 3500
            }).catch(err => {
                if(!err?.response?.status) {
                    event.alertToggle(true, "잠시 후 다시 시도해주세요.");
                    return;
                } else 
                switch(err.response.status) {
                    case 400 : {
                        event.alertToggle(true, "오류가 발생했어요.");
                        return;
                    }
                    case 404 : {
                        event.alertToggle(true, "비밀번호를 확인해주세요.");
                        return;
                    }
                    case 500 :
                    default : {
                        event.alertToggle(true, "잠시 후 다시 시도해주세요.");
                        return;
                    }
                    
                }
            });
            if(response?.status === 200) {
                // 탈퇴 성공
                if(!login) login = new LoginModule();
                await login.delete();
                setUserInfo(null);
                history.replace("/");
                return;
            }
        }, // outOfAccount
    };
    return (
        <section id="Setting">
            <div className="alert-wrapper" ref={alertWrapper}>
                <div className="alert-frame">
                    <h1 style={{color:"#ff0000"}}></h1>
                </div>
                <div className="alert-closer" onTouchStart={() => event.alertToggle(false)}></div>
            </div>
            <i className="material-icons back" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <h1>회원 탈퇴</h1>
            </header>
            <article>
                <div className="change-wrapper">
                    <div className="title">
                        <h2>비밀번호 입력</h2>
                        <p>사용자를 확인합니다.</p>
                    </div>
                    <div className="input-wrapper">
                        <input type="password" placeholder="사용자를 확인합니다." ref={password} minLength="8" maxLength="25"/>
                    </div>
                </div>
                <div className="change-wrapper">
                    <div className="title">
                        <h2>탈퇴 사유를 알려주세요</h2>
                        <p>Sizelity 발전을 위해 소중한 의견을 전달해주세요.</p>
                    </div>
                    <div className="option-wrapper">
                        <select defaultValue="" onChange={(e) => setOption(e.target.value)}>
                            <option value="" disabled hidden>탈퇴사유를 알려주세요</option>
                            <option value="lessInfo">필요한 정보가 없어요</option>
                            <option value="howCan">어떻게 사용하는지 모르겠어요</option>
                            <option value="otherService">유사 서비스를 사용해요</option>
                            <option value="uncomfortable">불편해요</option>
                            <option value="other">기타</option>
                        </select>
                    </div>
                    
                    
                </div>
                {
                    option === 'other' ? (
                        <div className="suggest-wrapper">
                            <input type="text" maxLength="200" placeholder="기타 사유를 알려주세요" ref={suggestInput}/>
                         </div>
                     ): null
                }
            </article>
            <div className="footer-btn">
                <div onClick={() => event.outOfAccount()}>
                    {
                        loader ? (
                            <div className="loader"></div>
                        ) : (
                            <p>탈퇴</p>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default AccountOut;