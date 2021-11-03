import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';


// CSS
import '../contents/css/IndexRouter.css';

// Svg
import {ReactComponent as Female} from '../contents/asset/female_24dp.svg';

// Context
import {LoginContext} from '../App';

const setThemeColor = () => {
    const themeColor = "#f0f2f5";
    if(document.querySelector("meta[name='theme-color']").content !== themeColor) {
        document.querySelector("meta[name='theme-color']").content = themeColor;
    }
}

const IndexRouter = ({history}) => {
    const loginWrapper = useRef(null);
    const { userInfo } = useContext(LoginContext);

    const toggleLoginWrapper = useCallback( (force) => {
        if(force === undefined) loginWrapper.current.classList.toggle("active");
        else {
            if(loginWrapper.current) {
                loginWrapper.current.classList.toggle("active",force);
                if(force) {
                    setTimeout(() => {toggleLoginWrapper(false);},3000);
                }
            }
        }
    }, [loginWrapper]);

    useEffect(() => {
        setThemeColor();
        toggleLoginWrapper(true);
    },[toggleLoginWrapper]);

    useEffect(() => {
        if(!["female","male"].includes(userInfo?.gender)) {
            window.alert("성별을 선택해주세요.");
            history.push("/setting/user/gender");
        }
    }, [userInfo])
    
    return (
        <main id="home">
            <header>
                {
                    userInfo?.gender === 'female' ? (
                        <i onClick={() => toggleLoginWrapper(true)}>
                            <Female width="2.6rem" height="2.6rem" fill="#000000" style={{marginTop: "1rem"}}/>
                        </i>
                    ) : (
                        <i className="material-icons" onClick={() => toggleLoginWrapper(true)}>face</i>
                    )
                }
                
                <div className="user-wrapper" ref={loginWrapper}>
                    <div className="user-title">
                        {
                            userInfo?.gender === 'female' ? (
                                <Female width="4.3rem" height="4.3rem" fill="#888888"/>
                            ) : (
                                <i className='material-icons'>face</i>
                            )
                        }
                        
                        <div>
                            <p>환영합니다.</p>
                            <div>
                                <h1>{userInfo.name}</h1>
                                <p>님</p>
                            </div>
                            
                        </div>
                        
                        <Link to="/setting"><i className="material-icons">settings</i></Link>
                    </div>
                    <div className="user-btn-frame">
                        <Link to="/closet" style={{borderRight: "1px solid #dbdbdb"}}>
                            <i className="material-icons">door_sliding</i>
                            <p>나의 옷장</p>
                        </Link>
                        <Link to="/after">
                            <i className="material-icons">watch_later</i>
                            <p>나중에 볼 상품</p>
                        </Link>
                    </div>
                    <div className="event">
                        <Link to="/event">놓칠 수 없는 쇼핑몰 이벤트를 한 눈에!</Link>
                    </div>
                </div>
            </header>
            <section id="Main">
                <div id="search-wrapper">
                    <h1 id="title">상품의 주소를 입력해주세요</h1>
                    <Link to="/search" id="search-input-wrapper">
                        <div id="search-input-frame">
                            <p>상품의 주소를 입력해주세요.</p>
                        </div>
                    </Link>
                </div>
            </section>
            <div className="logo-wrapper">
                <Link to="/" className="sizelity_logo">
                    <i className="material-icons">sell</i>
                </Link>
            </div>
        </main>
    );
}
export default IndexRouter;

