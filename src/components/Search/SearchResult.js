import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ProductSearch from '../../contents/js/ProductSearch';
import SearchHistory from "../../contents/js/SearchHistory";

// Context
import { ServerContext } from '../../App';

const SearchResult = ({praw, history}) => {
    // State
    const [response, setResponse] = useState(null);
    const [onLoader, setOnLoader] = useState(false);

    // Context
    const server = useContext(ServerContext);
    
    // Memo
    const productSearch = useMemo(() => {
        return new ProductSearch(server);
    }, [server]);

    // Callback
    const __fetchSearchData = useCallback( async (praw) => {
        try {
            setOnLoader(true);
            const __response = await productSearch.search({url: praw});
            console.log("결과", __response);
            if(__response?.type === 'success') {
                setResponse(__response?.type);
            } else {
                setResponse(null);
            }
        } catch(error) {
            setResponse(500);
        } finally {
            setOnLoader(false);
        }
    }, [productSearch]);

    const resultClickEvent = (productData) => {
        const { sname, pname, subtype } = productData.info;
        const { full } = productData.praw;

        // 최근 본 상품에 저장
        const __SearchHistory = new SearchHistory();
        __SearchHistory.set({sname, pname, subtype, full});
        
        // Compare 로 이동
        history.push({
            pathname: `/compare`,
            search: `?shop=${productData.praw.domain}&no=${productData.praw.code}`,
            state : {productData},
        });
        
    }
    useEffect(() => {
        if(praw !== null) __fetchSearchData(praw);
    },[praw, __fetchSearchData]);
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
            if(response && response.constructor === Object) {
                const { sname, pname, ptype, subtype } = response.info;
                return (
                    <div onClick={() => resultClickEvent(response)} className="Search-success">
                        <p>{sname}</p>
                        <h1>{pname}</h1>
                        <div>
                            <p>{ptype}</p>
                            <b>/</b>
                            <p>{subtype}</p>
                        </div>
                    </div>
                )
            } else {
                switch(response) {
                    case 204 : {
                        return (
                            <div className="Search-none">
                                <i className="material-icons">mood_bad</i>
                                <p>상품정보가 없어요.</p>
                            </div>
                        )
                    }
                    case 403 : {
                        return (
                            <div className="Search-none">
                                <i className="material-icons">mood_bad</i>
                                <p>잘못된 주소입니다.</p>
                            </div>
                        )
                    }
                    case 500 :
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
}
export default React.memo(SearchResult);