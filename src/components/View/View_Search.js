import { useRef, useState } from 'react';

// CSS
import '../../contents/css/View/View_Search.css';

// Component
import SearchResult from './View_SearchResult';
const Search = ({history}) => {
    const [praw, setPraw] = useState(null);
    const searchInput = useRef(null);

    const searchClickEvent = (e) => {
        e.stopPropagation();
        setPraw(searchInput.current.value);
    }
    
    return (
        <section id="Search">
            <div className="Search-inputWrapper">
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
                <input ref={searchInput} type="text" autoComplete="off" placeholder="상품 주소를 입력해주세요."/>
                <i className="material-icons" onClick={(e) => searchClickEvent(e)}>search</i>
            </div>
            <div className="Search-inputResult">
                <SearchResult 
                    praw={praw}/>
            </div>
        </section>
    )
}
export default Search;