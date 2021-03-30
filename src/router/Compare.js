import axios from 'axios';
import React, {createContext, useMemo, useEffect, useState ,useContext} from 'react';
import { useCookies } from 'react-cookie';
import URLModule from '../contents/js/URL';

// CSS
import '../contents/css/Compare/Compare_Router.css';

// Component
import Main from '../components/Compare/Compare_Main';
import { Link } from 'react-router-dom';

// Context
import {ServerContext} from '../App';
export const ProductContext = createContext(null);


const Compare = ({history, location}) => {
    // Cookie
    const [{sizelity_currentSearchData}, setCookies] = useCookies([]);

    const referrer = document.referrer;
    
    // State
    const [data, setData] = useState(history.location?.state?.data);
    const [loader, setLoader] = useState(!data);
    const [status, setStatus] = useState(0);

    // Context 
    const server = useContext(ServerContext);
    

    useEffect(() => { 
        const getProduct = async (query) => {
            try {
                const response = await axios({
                    method: "get",
                    url : `${server}/product/${query}`,
                    timeout : 2500
                }).catch(() => {
                    return {data:{status:500}};
                });
                console.log("검색 결과 : ", response.data);
                if(response.data?._id) {
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
            } catch(error) {setStatus({status: -200})}
            setLoader(false);
        }

        if(!data) {
            // 상품 정보 없음. -> 검색
            let query = null;
            if(referrer) {
                const urlModule = new URLModule();
                const {domain, code} = urlModule.get(referrer);
                if(domain && code) query = `${domain}/${code}`;
            } else if(location.search) {
                //const {domain, code} = new URLSearchParams(location.search);
                const params = new URLSearchParams(location.search);
                const domain = params.get("shop");
                const code = params.get("no");
                if(domain && code) query = `${domain}/${code}`;
            }
            if(query) {
                getProduct(query);
            } else {
                setData(null);
                setLoader(false);
            }
        }
    }, []);

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
                        status === 404 ? (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>죄송합니다.</h1>
                                <h1>상품 정보가 없습니다.</h1>
                                <p>입력하신 상품의 사이즈 정보는</p>
                                <p>영업일 기준 2일이내에 자동으로 입력됩니다.</p>
                                <button onClick={() => history.replace("/search")}>다른 상품 검색</button>
                            </div>
                        ) : status === 500 ? (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>죄송합니다.</h1>
                                <h1>서버와의 연결에 실패했습니다.</h1>
                            </div>
                        ) : status === -200 ? (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>죄송합니다.</h1>
                                <h1>잠시 후 다시 시도해주세요.</h1>
                            </div>
                        ) : (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>잘못된 접근입니다.</h1>
                                <p>상품을 검색할 수 없습니다.</p>
                                <button onClick={() => history.replace("/search")}>다른 상품 검색</button>
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