import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import URLModule from '../../contents/js/URL';

// 저장 버튼을 누를 때만 삭제된 정보를 저장.
const SearchCurrent = ({history}) => {
    const [deleteOption, setDeleteOption] = useState(false);
    const [{sizelity_currentSearchData}, setCookie, removeCookie] = useCookies(["sizelity_currentSearchData"]);
    console.log("Current Search Cookie : ", sizelity_currentSearchData);

    /*
        1. 데이터를 하나 삭제 -> 저장 안함.
        2. 검색 주소 전달
        -> Cookie 에 null 값이 남아 있어서 해당 데이터에서의 오류가 발생

        쿠키를 불러오고 나서 해당 데이터에 null 값이 존재하는지 확인
        : null 인 데이터를 화면에 그리려는 과정에서의 오류로 null은 화면에 그리지 않게 막음
    */

    const event = {
        toggleNavBtn() {
            if(deleteOption) {
                if(sizelity_currentSearchData.length > 0) {
                    const changeCurrent = sizelity_currentSearchData.filter(element => element !== null);
                    //console.log("Current cookie renewer.. cookie count : ", changeCurrent.length);
                    setCookie("sizelity_currentSearchData", changeCurrent, {path:"/", maxAge:(500 * 24 * 60 * 60)});
                } else {
                    console.log("Current cookie remove !");
                    removeCookie("sizelity_currentSearchData",{path:"/"});
                }
                //console.log("after data : ", sizelity_currentSearchData);
            }
            setDeleteOption(!deleteOption);
        },
        moveCompare: async(element) => {
            const __u = new URLModule();
            const data = __u.get(element[3]); // full
            
            if(data) {
                console.log("최근 본 상품에서 이동 : ", data);
                history.push({
                    pathname: "/compare",
                    search: `?shop=${data.domain}&no=${data.code}`,
                });
            }
        },
        remove: (e, index) => {
            if(!sizelity_currentSearchData) return;
            e.stopPropagation();
            let target = e.target;
            let i = 0;
            while(!(target.classList.contains("Search-currentElement")) && i < 5) {
                target = target.parentElement;
                i++;
            }
            if(i === 4 && !target.classList.contains("Search-currentElement")) return false;
            else {
                console.log("DELETE INDEX : ",index);
                sizelity_currentSearchData[index] = null;
                target.classList.add("remove");
                setTimeout(() => {target.style.display = 'none'},360);
            }
        }
    }
    
    useEffect(() => {
        if(!deleteOption) {
            const r = document.querySelectorAll('li.remove');
            if(r) {
                for(const element of r) {
                    element.classList.remove("remove");
                    element.style.display = 'flex';
                }
            }
        }
    }, [deleteOption]);
    /* useEffect(() => {
        console.log("change");
        return () => {
            if(sizelity_currentSearchData && sizelity_currentSearchData.constructor === Array) {
                console.log(sizelity_currentSearchData);
                const changeCookies = sizelity_currentSearchData.filter(element => {
                    try{return (element !== null && element.length === 4)} catch {return false};
                });
                if(changeCookies.length !== sizelity_currentSearchData.length) {
                    setCookie("sizelity_currentSearchData", changeCookies, {path:"/", maxAge:(500 * 24 * 60 * 60)});
                }
            }
        }
    },[sizelity_currentSearchData]); */
    return (
        (sizelity_currentSearchData && sizelity_currentSearchData.length > 0) ? (
            <>
                <div className="Search-currentNav">
                    <h1>최근 본 상품</h1>
                    <button onClick={() => event.toggleNavBtn()} className={deleteOption ? 'save' : 'delete'}>{deleteOption ? "저장" : "삭제"}</button>
                </div>
                <ul>
                {sizelity_currentSearchData.map((element, index) => 
                    element !== null ? (
                        
                    <li key={index} className={"Search-currentElement"}>
                        <div onClick={() => event.moveCompare(element)} className="Search-currentInfoFrame">
                            <div className="Search-currentName">
                                <p>{element[0]}</p>
                                <h1>{element[1]}</h1>
                            </div>
                            <div>
                                <p style={{textAlign:"right"}}>{element[2]}</p>
                            </div>
                        </div>
                        <a href={`http://${element[3]}`} className="Search-currentBtnFrame">
                            <i className="material-icons">open_in_new</i>
                        </a>
                        <button onClick={(e) => event.remove(e, index)} className={deleteOption ? "active" : ""}>
                            <i className="material-icons">remove</i>
                        </button>
                    </li>
                    ) : null
                )}
                </ul>
            </>
        ) : (
            <>  
                <div className="Search-currentNav">
                    <h1>최근 본 상품</h1>
                </div>
                <ul>
                    <li className="Search-currentNone">
                        <p>최근 본 상품이 없습니다.</p>
                    </li>
                </ul>
            </>
        )
    )
}

export default SearchCurrent;
