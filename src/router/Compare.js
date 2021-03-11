import axios from 'axios';
import React, {createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URLModule from '../contents/js/URL';

// Test Component
import Compare2 from './CompareTest2';

// Context
export const ProductContext = createContext(null);

let urlModule = null;
const Compare = ({history}) => {
    if(!urlModule) {
        console.log("URL 모듈 생성");
        urlModule = new URLModule();
    }
    const referrer = document.referrer;
    // Test Code
    // const referrer = "m.mr-s.co.kr/product/%EB%A1%9C%EC%9D%B8-%EB%A9%94%EC%A2%85-%EB%B8%8C%EC%9D%B4%EB%84%A5-%EB%8B%88%ED%8A%B8/39581";
    const u = urlModule.get(referrer);
    
    // State
    const [loader, setLoader] = useState(true);
    const [productURL] = useState(
        u ? referrer : history.location.state ? history.location.state.data.praw.full : null
    );
    const [data, setData] = useState(history.location.state ? history.location.state.data : null);
    
    useEffect(async () => {
        if(data === null && productURL !== null) {
            try {
                const response = await axios({
                    method: "get",
                    url : `http://localhost:3001/product/get?shop=${u.domain}&no=${u.code}`,
                    timeout : 6000
                }).catch(() => {
                    console.log("TIMEOUT");
                    return {data:{status:-200}};
                });
                console.log("검색 결과 : ", response);
                if(response.data._id) setData(response.data);
                else {
                    switch(response.data) {
                        default : {
                            console.log("상품데이터를 가져오지 못했습니다. status code : ", response.data.status);
                        }
                    }    
                }
            } catch(error) {
                console.error(error);
            }
        }
        setLoader(false);
    }, [productURL]);

    return (
        loader ? (
            <div>
                <div className="loader" style={{
                    border: "2px solid red",
                    borderTop:"2px solid #fff",
                    width:"2rem",
                    height:"2rem"
                }}></div>
            </div>
        ) : (
            <div>
                <a href="/comparetest2">test2 a</a>
                <div></div>
                <Link to="/comparetest2">test2 link</Link>
                <div>
                    <ProductContext.Provider value={data}>
                        <Compare2 />
                    </ProductContext.Provider>
                </div>
            </div>
        )
    )
}

//export default React.memo(Compare);
export default Compare;