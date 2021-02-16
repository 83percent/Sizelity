import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Proptype from 'prop-types';

import ProductData from '../../contents/js/ProductData';

/*
    @params praw : 검색하려는 주소 - 서버에 요청을 보내려는 주소
    @params setData : 상위 컴포넌트의 data state 의 setter
*/
let productData = null;
const SearchResult = ({praw, setData}) => {
    const [responseData, setResponseData] = useState(null);
    const onLoader = useRef(true);


    const resultClick = (e) => {
        e.stopPropagation();
        if(responseData.status === 200) setData(responseData);
    }

    const fetchData = useCallback( async (praw) => {
        try {
            if(!productData) productData = new ProductData(3);
            const __responseData = await productData.get(praw);

            // 데이터 검증과정 추가해야함.
            
            onLoader.current = false;
            setResponseData(__responseData);
        } catch(error) {
            setResponseData(null);
            console.log("error", error)
        }
    }, [praw]);
    useEffect(() => {
        onLoader.current = true;
    });
    useEffect(() => { 
        if(praw !== null) fetchData(praw);
    }, [praw]);


    // 검색하려는 검색어(praw) 변화 감지 -> loader 활성화
    

    //if(false) {
    if(responseData) {
        switch(responseData.status) {
            case 200 : {
                return (
                    <div className="Compare-searchResult-frame on" onClick={(e) => resultClick(e)}>
                        <p>{responseData.info.sname}</p>
                        <h1>{responseData.info.pname}</h1>
                        <div>
                            <p>{responseData.info.ptype}</p>
                            <p>/</p>
                            <p>{responseData.info.subtype}</p>
                        </div>
                    </div>
                )
            }
            case 400 : {
                return (
                    <div className="Compare-searchResult-frame off">
                        정보없음
                    </div>
                )
            }
        }
        
    } else {
        // 오류
        return (
            <div className="Compare-searchResult-frame loaderFrame">
                <div className="loader"></div>
            </div>
        )
    }
}

SearchResult.proptype = {
    praw : Proptype.string,
    setData : Proptype.func.isRequired // 상위 컴포넌트의 data를 변경하는 state 함수
}

//export default SearchResult;
export default React.memo(SearchResult);