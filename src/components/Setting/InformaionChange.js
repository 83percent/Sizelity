import axios from "axios";
import { useContext, useRef, useState } from "react";

// Context
import {ServerContext} from '../../App';
import {LoginContext} from '../../App';


const ChangeUserInfomation = ({history}) => {
    // Context 
    const server = useContext(ServerContext);
    const {userInfo, setUserInfo} = useContext(LoginContext);
    if(!userInfo?._id) history.replace('/notlogin')
    console.log(history)

    // State
    const [loader, setLoader] = useState(false);

    // Field
    const userData = (()=> {
        try {
            let {username, name} = JSON.parse(localStorage.getItem("authWithSizelity"));
            if(!username) username = "";
            if(!name) name = "";
            return {username, name};
        } catch {
            return {username: "", name: ""}
        }
    })();

    // Ref
    const alertWrapper = useRef(null);
    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);

    const event = {
        changeInfo : async () => {
            if(!password.current.value) {
                event.alertToggle(true,"비밀번호를 입력해주세요.");
                return;
            }
            if(!(/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/).test(password.current.value)) {
                event.alertToggle(true,"형식에 맞지 않는 비밀번호 입니다.");
                return;
            }

            const change = {
                type : "info",
                now : password.current.value,
                cate : [],
            };
            if(userData?.username !== email.current.value) {
                // Email 변경
                const isEmail = ((value) => {
                    return (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i).test(value);
                })(email.current.value);

                if(!isEmail) {
                    event.alertToggle(true, "이메일 형식이 올바르지 않습니다.");
                    return;
                }
                change.uid = email.current.value;
                change.cate.push("email");
            }
            if(userData?.name !== name.current.value) {
                // 이름 변경
                if(name.current.value < 2 || name.current.value > 20) {
                    event.alertToggle(true, "이름의 형식이 올바르지 않습니다.");
                    return;
                }
                change.name = name.current.value;
                change.cate.push("name");
            }
            if(change.cate.length === 0) {event.alertToggle(true, "변경 점이 없습니다."); return;}
            setLoader(true);
            const response = await axios({
                method: "PATCH",
                url : server + '/user',
                data : change,
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
            });;
            console.log("수정 응답 결과 : ", response.data);
            if(response?.data?.status) {
                switch(response.data.status) {
                    case 200 : {
                        // 200 변경 성공 : web 정보 변경
                        const local = JSON.parse(localStorage.getItem("authWithSizelity"));
                        for(let cate of change.cate) {
                            switch (cate) {
                                case "email" : {local.username = change.uid; break;}
                                case "name" : {local.name = change.name; break;}
                                default : {break;}
                            }
                        }
                        localStorage.setItem('authWithSizelity',JSON.stringify(local));
                        const session = JSON.parse(sessionStorage.getItem('auth'));
                        session.name = change.name;
                        sessionStorage.setItem('auth', JSON.stringify(session));
                        setUserInfo(session);
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
                        event.alertToggle(true, "잠시 후 다시 시도해주세요.");
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
                        event.alertToggle(true, "잠시 후 다시 시도해주세요.");
                    }
                }
            } else event.alertToggle(true, "잠시 후 다시 시도해주세요.");
        },
        alertToggle : (force, text) => {
            if(!alertWrapper.current) return;
            if(force === undefined) force = !alertWrapper.current.classList.contains("on");
            if(force) {
                if(text !== undefined) alertWrapper.current.querySelector("h1").innerHTML = text;
            }
            alertWrapper.current.classList.toggle("on",force);
        }, // alertToggle
        accountout : () => {
            history.push("/setting/accountout");
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
                <h1>개인정보 수정</h1>
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
                        <h2>이메일</h2>
                        <p>이메일은 로그인 및 비밀번호를 찾을 때 이용됩니다.</p>
                    </div>
                    <div className="input-wrapper">
                        <input type="email" placeholder="E-Mail" ref={email} defaultValue={userData?.username}/>
                    </div>
                </div>
                <div className="change-wrapper">
                    <div className="title">
                        <h2>이름</h2>
                        <p>변경하려는 이름을 입력해주세요.</p>
                    </div>
                    <div className="input-wrapper">
                        <input type="text" placeholder="사용자 이름" ref={name} minLength="2" maxLength="20" defaultValue={userData?.name}/>
                    </div>
                </div>
            </article>
            <div className="signout">
                <p onClick={() => event.accountout()}>Sizelity 계정 삭제</p>
            </div>
            <div className="footer-btn">
                <div onClick={() => event.changeInfo()}>
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

export default ChangeUserInfomation;