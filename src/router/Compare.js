import axios from 'axios';
import React, {createContext, useMemo, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import URLModule from '../contents/js/URL';

// CSS
import '../contents/css/Compare/Compare_Router.css';
// Component
import Main from '../components/Compare/Compare_Main';
import { Link } from 'react-router-dom';

// Context
export const ProductContext = createContext(null);

let urlModule = null;
const Compare = ({history, location}) => {
    if(!urlModule) {
        console.log("URL 모듈 생성");
        urlModule = new URLModule();
    }

    const server = 'http://localhost:3001';
    //const server = 'http://192.168.11.2:3001';

    // Cookie
    const [{sizelity_currentSearchData}, setCookies] = useCookies([]);

    const referrer = document.referrer;
    // Test Code
    // const referrer = "m.mr-s.co.kr/product/%EB%A1%9C%EC%9D%B8-%EB%A9%94%EC%A2%85-%EB%B8%8C%EC%9D%B4%EB%84%A5-%EB%8B%88%ED%8A%B8/39581";
    const u = referrer ? urlModule.get(referrer) : null;
    
    // State
    const [loader, setLoader] = useState(true);
    const [productURL] = useState(
        u ? referrer : history.location.state ? history.location.state.data.praw.full : null
    );
    const [data, setData] = useState(history.location.state ? history.location.state.data : null);
    const [status, setStatus] = useState(0);


    // location.search 데이터 : sizelity?shop=...&no=... 로 전달될 수 있음.
    const isLocation = useMemo(() => {
        if(productURL) return false;
        try {
            const params = new URLSearchParams(location.search);
            return (params.has('shop') && params.has('no'));
        } catch{return false}
    }, [productURL, location.search]);
    

    useEffect(() => { 
        const getProduct = async (query) => {
            try {
                const response = await axios({
                    method: "get",
                    url : `${server}/product/get${query}`,
                    timeout : 6000
                }).catch(() => {
                    console.log("TIMEOUT");
                    return {data:{status:-200}};
                });
                console.log("검색 결과 : ", response);
                if(response.data._id) {
                    // 데이터 가져오기 성공.
                    try {
                        // 최근 검색 상품 쿠키에 넣기
                        const sname = response.data.info.sname;
                        const pname = response.data.info.pname;
                        let isSame = false;
    
                        let current = sizelity_currentSearchData;
                        if(current) {
                            for(const element of current) {
                                if(element[0] === sname && element[1] === pname) {
                                    isSame = true;
                                    break;
                                }
                            }
                        } else {
                            current = new Array([]);
                        }
                        if(!isSame) {
                            if(current.length > 20) current.pop();
                            current.unshift([ response.data.info.sname, response.data.info.pname, response.data.info.subtype, response.data.praw.full]);
                            setCookies("sizelity_currentSearchData",current,{path:"/", maxAge:(500 * 24 * 60 * 60)});
                        }
                    } catch{} finally {
                        setData(response.data);
                    }
                    
                } else {
                    if(response.data.status) setStatus(response.data.status);
                }
            } catch(error) {
                console.error(error);
            }   
            setLoader(false);
        }
        if((data === null && productURL !== null) || isLocation) {
            const query = isLocation ? location.search : `shop=${u.domain}&no=${u.code}`;
            getProduct(query);
        }
    }, [productURL]);

    return (
        loader ? (
            <section id="Compare">
                <div className="loader" style={{
                    border: "2px solid #888888",
                    borderTop:"2px solid #00000000",
                    width:"2rem",
                    height:"2rem"
                }}></div>
            </section>
        ) : (
            data ? (
                <ProductContext.Provider value={data}>
                    <Main 
                        history={history}
                        productData={data}
                    />
                </ProductContext.Provider>
            ) : (
                <section id="Compare">
                    {
                        status === -404 ? (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>죄송합니다.</h1>
                                <h1>상품 정보가 없습니다.</h1>
                                <p>입력하신 상품의 사이즈 정보는</p>
                                <p>영업일 기준 2일이내에 자동으로 입력됩니다.</p>
                            </div>
                        ) : status === -200 ? (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>죄송합니다.</h1>
                                <h1>서버와의 연결에 실패했습니다.</h1>
                            </div>
                        ) : (
                            <div>
                                기타
                            </div>
                        )
                    }
                    <footer>
                        <Link to="/">Sizelity</Link>
                    </footer>
                </section>
            )
        )
    )
}

//export default React.memo(Compare);
export default Compare;