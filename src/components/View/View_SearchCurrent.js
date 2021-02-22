import React, { useEffect, useState } from 'react';
import ProductSearch from "../../contents/js/ProductSearch"


let productSearch = null;
const SearchCurrent = ({history}) => {
    
    const [deleteOption, setDeleteOption] = useState(false);
    
    if(!productSearch) productSearch = new ProductSearch();
    const currentSearchData = productSearch.getCurrent();
    const event = {
        toggleNavBtn(toggle) {
            if(!toggle) productSearch.fetchCurrent(currentSearchData);
            setDeleteOption(toggle);
        },
        moveCompare: async(element) => {
            const data = await productSearch.search(element[0]);
            console.log(data);
            history.push({
                pathname: "/view/compare",
                search: `?shop=${data.info.sname}&no=${data.praw.code}`,
                state: { data : data }
            });
        },
        remove: (e, index) => {
            e.stopPropagation();
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
    }

    useEffect(() => {
        // Cleanup 최근 본 상품 목록의 변동이 있을 경우 작동
        return function cleanup() {
            productSearch.fetchCurrent(currentSearchData);
        };
    });
    
    return (
        <>
            <div className="Search-currentNav">
                <h1>최근 본 상품</h1>
                <button onClick={() => setDeleteOption(!deleteOption)}>{deleteOption ? "저장" : "삭제"}</button>
            </div>
            <ul>
                {
                    (currentSearchData && currentSearchData[0]) ? (
                        currentSearchData.map((element, index) => (
                            <li key={index} className="Search-currentElement">
                                <div onClick={() => event.moveCompare(element)} className="Search-currentInfoFrame">
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
                                <button onClick={(e) => event.remove(e, index)} className={deleteOption ? "active" : ""}>
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
        </>
    )
}

export default SearchCurrent;
