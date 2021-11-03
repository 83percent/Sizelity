import { useContext, useEffect, useMemo, useState } from "react";
import { ServerContext, LoginContext } from "../../../App";
import AccountModule from '../../../contents/js/Account';

const ChangeGender = ({history, location}) => {
    // State
    const [gender, setGender] = useState(location.state?.gender);

    // Context
    const server = useContext(ServerContext);
    const {userInfo, setUserInfo} = useContext(LoginContext);
    

    // useMemo
    const accountModule = useMemo(() => {
        return new AccountModule(server);
    }, [server])

    async function fetch() {
        if(location.state?.gender === gender) {
            window.alert("변경 사항이 없습니다.");
            return;
        }
        const response = await accountModule.patch({
            gender: gender
        });
        switch(response.type) {
            case 'success' : {
                let _userInfo = JSON.parse(JSON.stringify(userInfo));
                _userInfo.gender = gender;
                setUserInfo(_userInfo);
                window.alert("변경 되었습니다.");
                history.goBack();
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
        let frame = document.querySelector('label.on');
        frame?.classList.remove("on");
        frame = document.querySelector(`input[value="${gender}"]`);
        if(frame) frame.parentElement.classList.add("on");
    }, [gender]);
    return (
        <section id="list-wrapper">
            <header>
                <h1>성별 변경</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <article className="gender-frame">
                <div>
                    <label>
                        <p onClick={() => setGender("female")}>여자</p>
                        <input type="radio" name="gender" value="female"/>
                        <i className="material-icons">check</i>
                    </label>
                    <label>
                        <p onClick={() => setGender("male")}>남자</p>
                        <input type="radio" name="gender" value="male"/>
                        <i className="material-icons">check</i>
                    </label>
                </div>
                <button onClick={() => fetch()}>확인</button>
            </article>
        </section>
    )
}

export default ChangeGender;