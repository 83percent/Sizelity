import React, { useEffect, useState } from "react";
import ProductSearch from '../../contents/js/ProductSearch';
let productSearch = null;

const SearchResult = ({praw, history}) => {
    const [response, setResponse] = useState(null);
    const [onLoader, setOnLoader] = useState(false);
    const __fetchSearchData = async (praw) => {
        console.log("FETCH");
        if(!productSearch) productSearch = new ProductSearch();
        try {
            setOnLoader(true);
            const __response = await productSearch.search(praw);
            
            setResponse(__response);
            setOnLoader(false);
        } catch(error) {
            console.error(error);
        }
    }

    const resultEvent = (response) => {
        productSearch.setCurrent(response);
        /* history.push({
            pathname: "/view/compare",
            search: `?shop=${response.praw.domain}&no=${response.praw.code}`,
            state: { data : response }
        }); */
    }
    useEffect(() => {
        if(praw !== null) __fetchSearchData(praw);
    },[praw]);
    if(onLoader) {
        return (
            <div className="loader"></div>
        )
    } else {
        if(!response) {
            if(praw) {
                return (
                    <i className="material-icons" style={{fontSize:"3.0rem"}}>signal_cellular_connected_no_internet_4_bar</i>
                )
            } else {
                return (
                    <h1 className="logo">Sizelity.</h1>
                )
            }
            
        } else {
            switch(response.status) {
                case 200 : {
                    return (
                        <div onClick={() => resultEvent(response)} className="Search-success">
                            <p>{response.info.sname}</p>
                            <h1>{response.info.pname}</h1>
                            <div>
                                <p>{response.info.ptype}</p>
                                <b>/</b>
                                <p>{response.info.subtype}</p>
                            </div>
                        </div>
                    )
                }
                case 300 : {
                    return (
                        <div className="Search-none">
                            <i className="material-icons">mood_bad</i>
                            <p>상품정보에 오류가 생겨 불러올수 없어요.</p>
                        </div>
                    )
                }
                case 404 : {
                    return (
                        <div className="Search-none">
                            <i className="material-icons">mood_bad</i>
                            <p>상품정보가 없어요.</p>
                        </div>
                    )
                }
                case -404 : {
                    return (
                        <div className="Search-none">
                            <i className="material-icons">mood_bad</i>
                            <p>잘못된 주소입니다.</p>
                        </div>
                    )
                }
                default : {
                    return (
                        <>
                            <i className="material-icons">report_problem</i>
                            <p>검색중에 오류가 발생했습니다.</p>
                        </>
                    )
                }
            }
        }
    }
}
export default React.memo(SearchResult);