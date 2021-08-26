import '../contents/css/AccountRouter.css';

// Context
import {ServerContext} from '../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Image
import MainImage from '../contents/image/compare.png'

const AccountRouter = () => {
    const server = useContext(ServerContext);
    return (
        <main id="account">
            <div className="logo-wrapper">
                <Link to="/" className="sizelity_logo">
                    <i className="material-icons">sell</i>
                </Link>
            </div>
            <article>
                <h1>사이즈리티에서 내 옷과 사이즈 비교해보세요.</h1>
                <div>
                    <img src={MainImage} alt="샘플 서비스 이미지" />
                </div>
            </article>
            <section>
                <div>
                    <a className="facebook" href="">페이스북 로그인</a>
                    <a className="naver" href="">네이버 로그인</a>
                    <a className="kakao" href={`${server}/auth/kakao`}>카카오 로그인</a>

                </div>
            </section>
        </main>
    )
}

export default AccountRouter;