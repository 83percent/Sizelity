import { useContext, useEffect, useRef, useState } from 'react';

// CSS
import '../contents/css/Search/Search.css';

// Component
import SearchResult from '../components/Search/SearchResult';
import SearchCurrent from '../components/Search/SearchCurrent';

// Context
import { LoginContext }from '../App';
import { MediaContext } from '../App';

// SampleImage
import SampleImage1 from '../contents/image/sample_image1.png';
import SampleImage2 from '../contents/image/sample_image2.png';
import { Link } from 'react-router-dom';

const Search = ({history}) => {
    // State
    const [praw, setPraw] = useState(null);

    // Context
    const {userInfo} = useContext(LoginContext);
    const media = useContext(MediaContext);

    // Ref
    const searchInput = useRef(null);
    const alertWrapper = useRef(null);
    const adsRef = useRef(null);

    const searchClickEvent = (e) => {
        e.stopPropagation();
        let url = searchInput.current.value;
        url = url.indexOf("http") === 0 ? url : "http://"+url;
        const isURL = ((value) => {
            return (/^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/).test(value);
        })(url);
        if(isURL) setPraw(url);
        else alert("잘못된 주소입니다.");
    }
    
    const event = {
        moveAfter : () => {
            if(userInfo && userInfo._id) history.push("/after");
            else {
                event.alertToggle(true);
            }
        },
        alertToggle : (force) => {
            if(!alertWrapper.current) return;
            if(force === undefined) force = !alertWrapper.current.classList.contains("on");
            alertWrapper.current.classList.toggle("on",force);
        }
    }
    useEffect(() => {
        // 50%
        if(Math.floor((Math.random()*10)) % 2 === 1) {
            setTimeout(() => {
                try {
                    adsRef.current.classList.add("on");
                } catch {}
            }, 1500);
        }
    }, [adsRef])
    return (
        <section id="Search">
            <div className="alert-wrapper" ref={alertWrapper}>
                <div className="alert-frame">
                    <i className="material-icons">lock</i>
                    <h1><b>로그인</b>이 필요해요</h1>
                    <button onClick={() => history.push("/login")}>로그인</button>
                </div>
                {
                    media === "Desktops" ?
                    <div className="alert-closer" onClick={() => event.alertToggle(false)}></div> :
                    <div className="alert-closer" onTouchStart={() => event.alertToggle(false)}></div>
                }
                
            </div>
            <nav id="ads" ref={adsRef}>
                <div onClick={(e) => e.target.parentElement.classList.remove("on")}>

                </div>
                <section>
                    <div className="title">
                        <h1>이런 상품 어떠세요?</h1>
                        <i className="material-icons" onClick={() => adsRef.current.classList.remove("on")}>close</i>
                    </div>
                    <ul>
                        <li>
                            <a href="https://leezbecoming.com/product/detail.html?product_no=4143&cate_no=1&display_group=2">
                                <img src={SampleImage1} alt="sample1"/>
                                <p>쿠라 카라 셔츠 OPS</p>
                                <p>리즈비커밍</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://leezbecoming.com/product/detail.html?product_no=4141&cate_no=1&display_group=2">
                                <img src={SampleImage2} alt="sample2"/>
                                <p>호킨 볼레로 나시 세트</p>
                                <p>리즈비커밍</p>
                            </a>
                        </li>
                    </ul>
                    <div className="more">
                        <Link to="/">
                            <p>추천 상품 더보기</p>
                            <i className="material-icons">chevron_right</i>
                        </Link>
                    </div>
                </section>
            </nav>
            <div className="inputWrapper">
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
                <input ref={searchInput} type="text" autoComplete="off" placeholder="상품 주소를 입력해주세요."/>
                <i className="material-icons" onClick={(e) => searchClickEvent(e)}>search</i>
            </div>
            <div className="inputResult">
                <SearchResult 
                    praw={praw}
                    history={history}/>
            </div>
            <div className="hn" onClick={() => event.moveAfter()}>
                <div>
                    <i className="material-icons">watch_later</i>
                    <p>나중에 볼 상품</p>
                    <i className="material-icons">{(userInfo && userInfo._id) ? "keyboard_arrow_right" : "lock"}</i>
                </div>
            </div>
            <SearchCurrent history={history}/>
        </section>
    )
}

export default Search;