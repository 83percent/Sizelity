import { useEffect, useMemo, useRef, useState } from 'react';

// CSS
import '../../contents/css/View/View_Search.css';

// Component
import SearchResult from './View_SearchResult';
const Search = ({history}) => {
    const [praw, setPraw] = useState(null);
    const [deleteOption, setDeleteOption] = useState(false);

    const searchInput = useRef(null);
    const currentSearchData = sampleData;
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
        target.classList.add("remove");
        setTimeout(() => target.remove(),360);
    }
    useEffect(() => {
        // Clean up 할때 최근 본 상품 목록 변경 점 있는지 확인 후 쿠키 정리, 저장 해야함
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
                            sampleData.map((element, index) => (
                                <li key={index} className="Search-currentElement">
                                    <div className="Search-currentInfoFrame">
                                        <div className="Search-currentName">
                                            <p>{element[1]}</p>
                                            <h1>{element[2]}</h1>
                                        </div>
                                        <div>
                                            <p style={{textAlign:"right"}}>{element[4]}</p>
                                        </div>
                                        
                                    </div>
                                    <a href={`http://${element[5]}`} className="Search-currentBtnFrame">
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
/*
    Array index info
    {
        pcode: "PA000001", 
        sname: "string", 
        pname:"string", 
        ptype: "string", 
        subtype:"string",
        praw : "string"
    }
*/
const sampleData = [
    ["PA000020","자댕","Test Product Name","top","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 0
    ["PA000021","자댕","Test Product Name","bottom","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 1
    ["PA000022","조군샵","Test Product Name","top","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 2
    ["PA000023","무신사","Test Product Name","top","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 3
    ["PA000024","mr-street","Test Product Name","set","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 4
    ["PA000025","mr-street","Test Product Name","set","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 5
    ["PA000026","조군샵","Test Product Name","bottom","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 6
    ["PA000027","스나이퍼샵","Test Product Name","bottom","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 7
    ["PA000028","로인","Test Product Name","bottom","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 8
    ["PA000029","로인","Test Product Name","outer","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 9
    ["PA000030","키작남","Test Product Name","top","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 10
    ["PA000031","스나이퍼샵","Test Product Name","outer","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"], // 11
    ["PA000032","키작남","Test Product Name","outer","string","www.example.com/product/%21%2%12%76%90%1/branduid=1325232"]  // 12
]
export default Search;