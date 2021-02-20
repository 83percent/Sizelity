import { useEffect, useMemo, useRef, useState } from 'react';
import ProductSearch from "../../contents/js/ProductSearch"
// CSS
import '../../contents/css/View/View_Search.css';

// Component
import SearchResult from './View_SearchResult';
const Search = ({history}) => {

    const productSearch =  new ProductSearch();
    const [praw, setPraw] = useState(null);
    const [deleteOption, setDeleteOption] = useState(false);

    const searchInput = useRef(null);
    const currentSearchData = productSearch.getCurrent();
    const searchClickEvent = (e) => {
        e.stopPropagation();
        setPraw(searchInput.current.value);
    }
    const removeClick = (e, index) => {
        e.stopPropagation();
        //console.log(e.target);
        let target = e.target;
        let i = 0;
        while(!(target.classList.contains("Search-currentElement")) && i < 5) {
            target = target.parentElement;
            i++;
        }
        if(i === 4 && !target.classList.contains("Search-currentElement")) return false;
        else {
            currentSearchData[index] = null;
            target.classList.add("remove");
            setTimeout(() => target.remove(),360);

            console.log(currentSearchData);
        }
    }
    // Current Data Click 
    const moveComapre = async (element) => {
        const data = await productSearch.search(element[0]);
        console.log(data);
        /* history.push({
            pathName: "/view/compare",
            search: `?shop=${data.info.sname}&no=${data.praw.code}`,
            state: { data : data }
        }); */
    }
    useEffect(() => {
        
        // Cleanup 최근 본 상품 목록의 변동이 있을 경우 작동
        return function cleanup() {
            console.log("Clean Up commit..")
            productSearch.fetchCurrent(currentSearchData);
        };
    });
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
            <div className="Search-currentWrapper">
                <div className="Search-currentNav">
                    <h1>최근 본 상품</h1>
                    <button onClick={() => setDeleteOption(!deleteOption)}>삭제</button>
                </div>
                <ul>
                    {
                        currentSearchData ? (
                            currentSearchData.map((element, index) => (
                                <li key={index} className="Search-currentElement">
                                    <div onClick={() => moveComapre(element)} className="Search-currentInfoFrame">
                                        <div className="Search-currentName">
                                            <p>{element[1]}</p>
                                            <h1>{element[2]}</h1>
                                        </div>
                                        <div>
                                            <p style={{textAlign:"right"}}>{element[3]}</p>
                                        </div>
                                        
                                    </div>
                                    <a href={`http://${element[4]}`} className="Search-currentBtnFrame">
                                        <i className="material-icons">open_in_new</i>
                                    </a>
                                    <button onClick={(e)=>removeClick(e, index)}className={deleteOption ? "active" : ""}>
                                        <i className="material-icons">remove</i>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="Search-currentNone">
                                <p>최근 본 상품이 없습니다.</p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </section>
    )
}

export default Search;