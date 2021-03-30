import { useContext, useRef, useState } from 'react';

// CSS
import '../contents/css/Search/Search.css';

// Component
import SearchResult from '../components/Search/SearchResult';
import SearchCurrent from '../components/Search/SearchCurrent';

// Context
import { LoginContext }from '../App';
import { MediaContext } from '../App';


const Search = ({history}) => {
    // State
    const [praw, setPraw] = useState(null);

    // Context
    const {userInfo} = useContext(LoginContext);
    const media = useContext(MediaContext);

    console.log("로그인정보 : ", userInfo);
    // Ref
    const searchInput = useRef(null);
    const alertWrapper = useRef(null);

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
                    <p>나중에 볼 상품</p>
                    <i className="material-icons">{(userInfo && userInfo._id) ? "keyboard_arrow_right" : "lock"}</i>
                </div>
            </div>
            <div className="currentWrapper">
                <SearchCurrent 
                    history={history}/>
            </div>
        </section>
    )
}

export default Search;