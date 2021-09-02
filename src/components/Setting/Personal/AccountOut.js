import { useEffect, useState } from "react";
import AccountModule from '../../../contents/js/Account';
import { useCookies } from 'react-cookie';

// Context
import { ServerContext, LoginContext } from "../../../App";
import { useContext } from "react";
import { useMemo } from "react";
const AccountOut = ({history}) => {
    // State
    const [reason, setReason] = useState("");
    
    // Context
    const server = useContext(ServerContext);
    const { setUserInfo } = useContext(LoginContext);

    // Cookie
    const Cookies = useCookies(['sizelity_token']);

    // Memo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server]);

    async function fetch() {
        if(!reason) {
            window.alert("탈퇴 사유를 선택해주세요.");
            return;
        }
        if(!window.confirm("정말로 탈퇴할까요?")) return;
        const response = await accountModule.remove(reason);
        switch (response.type) {
            case 'success': {
                Cookies[2]('sizelity_token');
                history.replace("/");
                setUserInfo(null);
                break;
            }
            case 'error' : {
                window.alert(response?.msg);
                break;
            }
            default : {
                window.alert("문제가 발생했습니다.");
                break;
            }
        }
        
    }
    useEffect(() => {
        let frame = document.querySelector('label.on');
        const button = document.querySelector("button#sendBtn");
        if(reason === "") {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
        frame?.classList.remove("on");
        frame = document.querySelector(`input[value="${reason}"]`);
        if(frame) frame.parentElement.classList.add("on");
    }, [reason]);
    return (
        <section id="list-wrapper">
            <header>
                <h1>회원 탈퇴</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <article className="gender-frame out-frame">
                <p>사이즈리티 개선을 위한 탈퇴사유를 알려주세요.</p>
                <div>
                    <label>
                        <p onClick={() => setReason("help")}>도움이 안돼요</p>
                        <input type="radio" name="gender" value="help"/>
                        <i className="material-icons">check</i>
                    </label>
                    <label>
                        <p onClick={() => setReason("lessInfo")}>필요한 정보가 없어요</p>
                        <input type="radio" name="gender" value="lessInfo"/>
                        <i className="material-icons">check</i>
                    </label>
                    <label>
                        <p onClick={() => setReason("howCan")}>어떻게 사용하는지 모르겠어요</p>
                        <input type="radio" name="gender" value="howCan"/>
                        <i className="material-icons">check</i>
                    </label>
                    <label>
                        <p onClick={() => setReason("uncomfortable")}>불편해요</p>
                        <input type="radio" name="gender" value="uncomfortable"/>
                        <i className="material-icons">check</i>
                    </label>
                    <label>
                        <p onClick={() => setReason("otherService")}>다른 서비스를 사용할거에요</p>
                        <input type="radio" name="gender" value="otherService"/>
                        <i className="material-icons">check</i>
                    </label>
                    <label>
                        <p onClick={() => setReason("other")}>기타</p>
                        <input type="radio" name="gender" value="other"/>
                        <i className="material-icons">check</i>
                    </label>
                </div>
            </article>
            <div className="button-wrapper">
                <div>
                    <p>탈퇴 시 모든 정보를 삭제하는데 동의하는 것으로 간주합니다.</p>
                    <button id="sendBtn" onClick={() => fetch()}>사이즈리티 탈퇴</button>
                </div>
            </div>
        </section>
    )
}

export default AccountOut;