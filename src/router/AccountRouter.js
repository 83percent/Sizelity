import '../contents/css/AccountRouter.css';

// Context
import {ServerContext} from '../App';
import { useContext, useState } from 'react';

// Image
import MainImage from '../contents/image/compare.png'

/*
={`${server}/auth/naver`}
={`${server}/auth/kakao`}
*/

const AccountRouter = () => {
    const [loginType, setLoginType] = useState(null);
    const [terms, setTerms] = useState({service: false, privacy: false});

    const server = useContext(ServerContext);

    function __setLoginType(value) {
        setTerms({service: false, privacy: false});
        setLoginType(value);
    }

    function login() {
        if(!terms.service || !terms.privacy) {
            window.alert("약관에 동의해주세요.");
            return;
        }
        switch(loginType) {
            case "naver" : {
                window.location.href = `${server}/auth/naver`;
                break;
            }
            case "kakao" : {
                window.location.href = `${server}/auth/kakao`;
                break;
            }
            default : break;
        }
    }

    return (
        <main id="account">
            <header className="logo-wrapper">
                <div className="logo-frame">
                    <i className="material-icons">sell</i>
                </div>
            </header>
            <article>
                <div className="title">
                    <h1>SIZELITY</h1>
                    <p>사이즈 고민, 이제 그만</p>
                    <p>내 옷이랑 비교하자</p>
                </div>
                <div className="img">
                    <img src={MainImage} alt="샘플 서비스 이미지" />
                </div>
            </article>
            <section className="login-type-frame">
                <div>
                    <button className="naver" onClick={() => __setLoginType("naver")}>네이버 로그인</button>
                    <button className="kakao" onClick={() => __setLoginType("kakao")}>카카오 로그인</button>
                </div>
            </section>
            <section className={`terms-wrapper ${loginType !== null ? "active" : ""}`}>
                <i className="material-icons" onClick={() => __setLoginType(null)}>close</i>
                <div className="login-type">
                    {
                        loginType === "naver" ? (
                            <h4 className="naver">N</h4>
                        ) : loginType=== "kakao" ? (
                            <h4 className="kakao">K</h4>
                        ) : (
                            <h4>S</h4>
                        )
                    }
                </div>
                <ul>
                    <li onClick={() => setTerms({service: !terms.service, privacy: terms.privacy})} className={terms.service ? "active" : ""}>
                        <p>서비스 이용약관</p>
                        <a href="https://official.sizelity.com/terms/service" target="_blank" rel="noreferrer">내용보기</a>
                        <i className="material-icons">check</i>
                    </li>
                    <li onClick={() => setTerms({service: terms.service, privacy: !terms.privacy})} className={terms.privacy ? "active" : ""}>
                        <p>개인정보 처리방침</p>
                        <a href="https://official.sizelity.com/terms/privacy" target="_blank" rel="noreferrer">내용보기</a>
                        <i className="material-icons">check</i>
                    </li>
                    
                </ul>
                <button className={terms.service && terms.privacy ? "active" : ""} onClick={() => login()}>
                    <p>로그인</p>
                </button>
            </section>
        </main>
    )
}

export default AccountRouter;