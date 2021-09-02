import { useContext, useEffect, useMemo, useState } from "react";
import AccountModule from '../../../contents/js/Account';
import { ServerContext, LoginContext } from '../../../App';

const ChangeName = ({history, location}) => {
    // State
    const [name, setName] = useState(location.state?.name || "test");
    const { userInfo, setUserInfo } = useContext(LoginContext);
    console.log(userInfo)

    // Context
    const server = useContext(ServerContext);

    // Memo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server]);
    
    async function fetch() {
        if(location.state?.name === name) {
            window.alert("변경 사항이 없습니다.");
            return;
        }
        const response = await accountModule.patch({
            name : name
        });
        switch(response.type) {
            case 'success' : {
                window.alert("변경 되었습니다.");
                history.goBack();
                setUserInfo({_id: userInfo._id, name: name});
                break;
            }
            case 'error' : {
                window.alert(response?.msg);
                break;
            }
            default : {
                window.alert("문제가 발생했습니다.");
            }
        }
    }

    useEffect(() => {
        const frame = document.querySelector('input[name="displayName"]').parentElement;
        const button = document.querySelector('button#sendBtn');
        if(frame.nodeName !== 'LABEL') return;
        if(name.length > 20 || name.length < 2) {
            frame.classList.add("wrong");
            button.disabled = true;
        } else {
            frame.classList.remove("wrong");
            button.disabled = false;
        }
    }, [name]);
    return (
        <section id="list-wrapper">
            <header>
                <h1>이름 변경</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <article className="name-frame">
                <p>사이즈리티에 표시될 이름을 설정해주세요.</p>
                <div>
                    <label>
                        <input type="text"
                            name="displayName"
                            defaultValue={name}
                            onBlur={(e) => setName(String(e.target.value).trim())}
                            placeholder="2~20자 입력"/>
                        <p>{name.length} / 20</p>
                    </label>
                </div>
                <button id="sendBtn" onClick={() => fetch()}>확인</button>
            </article>
        </section>
    )
}

export default ChangeName;