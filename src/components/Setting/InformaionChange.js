import { useContext, useRef, useState } from "react";

// Context
import {ServerContext} from '../../App';
import {LoginContext} from '../../App';

// CSS
import '../../contents/css/Setting/ChangeInfo.css';

const ChangeUserInfomation = ({history}) => {
    const { userInfo } = useContext(LoginContext);
    const server = useContext(ServerContext);
    return (
        <section id="change-wrapper">
            <header>
                <h1>개인정보 수정</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <main>
                <section>
                    <div style={{marginTop : "1rem"}}>
                        <h2>이름</h2>
                        <input placeholder={userInfo?.name}/>
                    </div>
                    <div>
                        <h2>성별</h2>
                        <div>
                            <label>
                                <p>남자</p>
                                <input type='radio' name='gender' value="male"/>
                            </label>
                            <label>
                                <p style={{borderLeft: "1px solid #888"}}>여자</p>
                                <input type='radio' name='gender' value="female"/>
                            </label>
                        </div>
                    </div>
                </section>
                <section>
                    <p>탈퇴</p>
                </section>
            </main>
            <button>저장</button>
        </section>
    )
}

export default ChangeUserInfomation;