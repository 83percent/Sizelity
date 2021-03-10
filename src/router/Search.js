import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import '../contents/css/Search/Search.css';

// Component
import SearchResult from '../components/Search/SearchResult';
import SearchCurrent from '../components/Search/SearchCurrent';


const Search = ({history}) => {
    const [praw, setPraw] = useState(null);

    const searchInput = useRef(null);
    const searchClickEvent = (e) => {
        e.stopPropagation();
        let url = searchInput.current.value;
        url = url.indexOf("http") === 0 ? url : "http://"+url;
        const isURL = ((value) => {
            return (/^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/).test(url);
        })(url);
        if(isURL) setPraw(url);
        else alert("잘못된 주소입니다.");
    }
    
    return (
        <section id="Search">
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
            <div className="hn">
                <Link to="/after">
                    <p>나중에 볼 상품</p>
                    <i className="material-icons">	keyboard_arrow_right</i>
                </Link>
            </div>
            <div className="currentWrapper">
                <SearchCurrent 
                    history={history}/>
            </div>
        </section>
    )
}

export default Search;