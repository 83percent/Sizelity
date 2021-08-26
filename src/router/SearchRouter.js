import { useContext, useState } from 'react';

// CSS
import '../contents/css/Search/Search.css';

// Component
import SearchResult from '../components/Search/SearchResult';
import SearchCurrent from '../components/Search/SearchCurrent';

// Context
import { LoginContext }from '../App';


const Search = ({history}) => {
    // State
    const [praw, setPraw] = useState(null);

    // Context
    const {userInfo} = useContext(LoginContext);

    const searchClickEvent = (value) => {
        if(value === undefined) {
            value = document.querySelector("input[name='search-input']").value;
        }
        value = value.indexOf("http") === 0 ? value : "http://"+value;
        const isURL = ((value) => {
            return (/^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/).test(value);
        })(value);
        if(isURL) setPraw(value);
        else alert("잘못된 주소입니다.");
    }
    return (
        <section id="Search">
            <div className="inputWrapper">
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
                <input name="search-input" type="text" autoComplete="off" onKeyDown={(e) => {if(e.key === "Enter") searchClickEvent(e.target.value)}} placeholder="상품 주소를 입력해주세요."/>
                <i className="material-icons" onClick={() => searchClickEvent()}>search</i>
            </div>
            <div className="inputResult">
                <SearchResult 
                    praw={praw}
                    history={history}/>
            </div>
            <div className="hn" onClick={() => history.push('/after')}>
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