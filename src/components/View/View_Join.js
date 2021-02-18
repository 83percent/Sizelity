import { Link } from 'react-router-dom';
import '../../contents/css/View/View_Join.css';

const Join = ({history}) => {
    return (
        <section className="View-Join">
            <header>
                <div className="Login-backFrame" onClick={() => history.goBack()}>
                    <i className="material-icons">arrow_back</i>
                </div>
                <Link to="/view" >Sizelity.</Link>
                <h2>가입하기</h2>
            </header>
            <article className="bottom">
                <form>
                    <div style={{flexGrow : 1}}>
                        <ul>
                            <li className="title-wrapper">
                                <h1>로그인 정보</h1>
                            </li>
                            <li className="input-wrapper">
                                <input type="text" placeholder="이메일 (E-Mail)" id="input-email"/>
                            </li>
                            <li className="input-wrapper">
                                <input type="password" placeholder="비밀번호 (Password)" id="input-password"/>
                            </li>
                            <li className="input-wrapper">
                                <input type="password" placeholder="비밀번호 확인 (Re-Password)" id="input-re-password"/>
                            </li>
                        </ul>
                        <ul>
                            <li className="title-wrapper">
                                <h1>개인정보</h1>
                            </li>
                            <li className="input-wrapper">
                                <input type="text" placeholder="성 (Last Name)" id="input-first"/>
                                <input type="text" placeholder="이름 (First Name) - 성은 제외"  id="input-last"/>
                            </li>
                            <li className="input-wrapper">
                                <label>
                                    <p>남자</p>
                                    <div className="dot"></div>
                                    <input type="radio" name="gender" value="male"/>
                                </label>
                                <label className="on">
                                    <p>여자</p>
                                    <div className="dot"></div>
                                    <input type="radio" name="gender" value="frmale"/>
                                </label>
                                <label>
                                    <p>비공개</p>
                                    <div className="dot"></div>
                                    <input type="radio" name="gender" value="not"/>
                                </label>
                            </li>
                        </ul>
                        <ul>
                            <li className="title-wrapper">
                                <h1>약관</h1>
                            </li>
                            <li className="privacy-wrapper">
                                <label>
                                    <p>사이즈리티 서비스 이용약관 (필수)</p>
                                    <input type="checkbox" name="service_privacy" />
                                </label>
                                <button>
                                    <p>보기</p>
                                </button>
                            </li>
                            <li className="privacy-wrapper">
                                <label>
                                    <p>개인정보 수집 및 이용동의 (필수)</p>
                                    <input type="checkbox" name="service_privacy" />
                                </label>
                                <button>
                                    <p>보기</p>
                                </button>
                            </li>
                            <li className="privacy-wrapper">
                                <label>
                                    <p>프로모션 안내 메일 수신동의 (선택)</p>
                                    <input type="checkbox" name="service_privacy" />
                                </label>
                                <button>
                                    <p>보기</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="submit-wrapper">
                        <button>가입하기</button>
                    </div>
                </form>
            </article>
        </section>
    );
}
export default Join;