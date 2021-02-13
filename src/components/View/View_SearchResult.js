import React, { useCallback, useEffect, useRef, useState } from 'react';
import Proptype from 'prop-types';

import ProductData from '../../contents/js/ProductData';

/*
    @params praw : 검색하려는 주소 - 서버에 요청을 보내려는 주소
    @params setData : 상위 컴포넌트의 data state 의 setter
*/
let productData = null;
const SearchResult = ({praw, setData}) => {
    const [responseData, setResponseData] = useState(null);
    const fetchData = useCallback( async (praw) => {
        try {
            if(!productData) productData = new ProductData();
            const __responseData = await productData.get(praw);

            // 데이터 검증과정 추가해야함.
            setResponseData(__responseData);
        } catch(error) {setResponseData(null);}
    }, [praw]);

    useEffect(() => {
        if(praw !== null) fetchData(praw);
    }, [praw]);
    console.log("검색결과 데이터 : ", responseData);
    if(responseData) {
        switch(responseData.status) {
            case 200 : {
                return (
                    <div className="Compare-searchResult-frame on">
                        <p>{responseData.info.sname}</p>
                        <h1>{responseData.info.pname}</h1>
                        <a href={`http://${responseData.praw.full}`}>{`http://${responseData.praw.full}`}</a>
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
            <div className="Compare-searchResult-frame off">
                오류다
            </div>
        )
    }
}

SearchResult.proptype = {
    praw : Proptype.string,
    setData : Proptype.func.isRequired // 상위 컴포넌트의 data를 변경하는 state 함수
}

export default React.memo(SearchResult);