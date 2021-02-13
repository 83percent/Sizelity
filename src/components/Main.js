import { Link } from 'react-router-dom';
// CSS
import '../contents/css/Main.css';
// JS
import Open from '../contents/js/ServiceOpen';
const Main = () => {
    return(
        <section id="Main">
            <div className="Main-title-wrapper">
                <p className="Main-title">최적의 사이즈</p>
                <p className="Main-title">선택을 위하여.</p>
            </div>
            <div id="Main-sub-title">
                <p>나의 옷과 쉽게 비교</p>
                <p>모든 쇼핑몰, 모든 옷을 비교하여</p>
                <p>최고의 경험을 전해드립니다.</p>
            </div>
            <article>
                <button id="Main-OpenBtn" onClick={() => Open()}>시작하기</button>
                <div id="Main-Link-Box">
                    <Link to="">비회원으로 시작하기</Link>
                    <Link to="/home/join">회원가입</Link>
                    <div className="line"></div>
                    <Link to="">도움이 필요해요</Link>
                </div>
            </article>
        </section>        
    );
}
export default Main;