import axios from "axios";
import { useContext, useRef, useState } from "react";

// Context
import { ServerContext } from '../../App';


const ChangePassword = ({history}) => {

    // State
    const [loader, setLoader] = useState(false);

    // Context
    const server = useContext(ServerContext);

    // Ref
    const n_p = useRef(null); // now password
    const c_p = useRef(null); // change password
    const rc_p = useRef(null); // re change password
    const alertWrapper = useRef(null);

    const event = {
        changePassword : async () => {
            function isPwd(passwordRef) {
                if(!(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(passwordRef.current.value)) {
                    // 패턴과 불일치
                    passwordRef.current.classList.add("wrong");
                    event.alertToggle(true, "사용할 수 없는 비밀번호 입니다.");
                    return false;
                } else {
                    passwordRef.current.classList.remove("wrong");
                    return true;
                }
            }
            const passwordRefs = [n_p, c_p, rc_p];
            let pass = true;
            for(let passwordRef of passwordRefs) {
                if(!isPwd(passwordRef)) {
                    pass = false;
                    break;
                }
            };
            if(!pass) return false;
            const cv = c_p.current.value;
            if(cv !== rc_p.current.value) {
                rc_p.current.classList.add("wrong");
                event.alertToggle(true, "변경할 비밀번호가 일치하지 않습니다.");
                return false;
            } else rc_p.current.classList.remove("wrong");
            
            setLoader(true);
            const response = await axios({
                method : "PATCH",
                url: `${server}/user`,
                data : {
                    type: "password",
                    now : n_p.current.value,
                    change : cv
                },
                withCredentials: true,
                timeout: 3000
            }).catch((err) => {
                if(!err.response?.status) return {data:{status:500}}
                switch(err.response.status) {
                    case 401 : {
                        return {data:{status:401}};
                    }
                    default : {
                        return {data:{status:500}};
                    }
                }
            }).finally(() => {
                setLoader(false);
            });
            if(response?.data?.status) {
                switch(response.data.status) {
                    case 200 : {
                        // 200 변경 성공
                        history.goBack();
                        break;
                    }
                    case -1 : {
                        // -1 현재 패스워드 일치 하지 않음
                        event.alertToggle(true, "현재 비밀번호를 확인해주세요.");
                        break;
                    }
                    case -200 : {
                        // -200 변경 실패
                        event.alertToggle(true, "서버오류로 인해 변경에 실패하였습니다.");
                        break;
                    }
                    case 404 : {
                        // 404 유저 데이터 찾을 수 없음 UserModel.findById(불가)
                        event.alertToggle(true, "잠시 후 다시 요청해주세요.");
                        break;
                    }
                    case -404 : {
                        // -404 요청 데이터 형식을 갖추고 있지 않음
                        event.alertToggle(true, "잘못된 접근입니다.");
                        break;
                    }
                    case 401 : {
                        // auth Error
                        event.alertToggle(true, "잘못된 접근입니다.");
                        break;
                    }
                    default : {
                        // server Error
                        event.alertToggle(true,     "잠시 후 다시 요청해주세요.");
                    }
                }
            } else event.alertToggle(true, "잠시 후 다시 요청해주세요.");
        },
        alertToggle : (force, text) => {
            if(!alertWrapper.current) return;
            if(force === undefined) force = !alertWrapper.current.classList.contains("on");
            if(force) {
                if(text !== undefined) alertWrapper.current.querySelector("h1").innerHTML = text;
            }
            alertWrapper.current.classList.toggle("on",force);
        }
    }

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
                <h1>비밀번호 변경</h1>
                <p>최소 90일마다 비밀번호 변경을 권장드려요.</p>
                <p>안전한 비밀번호로 변경해주세요.</p>
            </header>
            <article>
                <div className="change-wrapper">
                    <div className="title">
                        <h2>현재 비밀번호</h2>
                        <p>변경 전 비밀번호를 입력해주세요.</p>
                    </div>
                    <div className="input-wrapper">
                        <input type="password" placeholder="현재 비밀번호" ref={n_p} minLength="8" maxLength="25"/>
                    </div>
                </div>
                <div className="change-wrapper">
                    <div className="title">
                        <h2>변경할 비밀번호</h2>
                        <p>변경하려는 비밀번호를 입력해주세요.</p>
                        <p>영문 대소문자, 숫자, 특수문자 포함 8~20자</p>
                    </div>
                    <div className="input-wrapper">
                    <input type="password" placeholder="변경 비밀번호" ref={c_p} minLength="8" maxLength="25"/>
                    </div>
                    <div className="input-wrapper">
                        <input type="password" placeholder="변경 비밀번호 확인" ref={rc_p} minLength="8" maxLength="25"/>
                    </div>
                </div>
            </article>
            <div className="footer-btn">
                <div onClick={() => event.changePassword()}>
                    {
                        loader ? (
                            <div className="loader"></div>
                        ) : (
                            <p>변경</p>
                        )
                    }
                    
                </div>
            </div>
        </section>
    )
}

export default ChangePassword;