import { useRef } from 'react';
import { Link } from 'react-router-dom';

// CSS
import '../../contents/css/help.css';

const Help = ({history}) => {
    const alertWrapper = useRef(null);

    const event = {
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
        <section id="Help">
            <div className="alert-wrapper" ref={alertWrapper}>
                <div className="alert-frame">
                    <h1 style={{color:"#ff0000"}}></h1>
                </div>
                <div className="alert-closer" onTouchStart={() => event.alertToggle(false)}></div>
            </div>
            <i className="material-icons back" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <h1>도움이</h1><h1> 필요하신가요?</h1>
            </header>
            <article>
                <div className="account-wrapper">
                    <button onClick={() => event.alertToggle(true, "준비중입니다.")}>
                        <p>비밀번호를 잊어버렸어요.</p>
                    </button>
                </div>
                <div className="connect-wrapper">
                    <div>
                        <Link><p>문의하기</p></Link>
                    </div>
                    <div>
                        <Link><p>개선사항을 보내주세요</p></Link>
                    </div>
                    <div>
                        <Link><p>자주묻는 질문</p></Link>
                    </div>
                </div>
            </article>
            <footer>
                <div>
                    <Link>이용약관</Link>
                    <div></div>
                    <Link>개인정보처리방침</Link>
                    <div></div>
                    <Link>Sizelity정책</Link>
                </div>
                <div>
                    <Link className="logo">Sizelity</Link>
                </div>
            </footer>
        </section>
    );
}
export default Help;