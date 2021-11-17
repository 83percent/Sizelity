import React, { useEffect, useState ,useContext, useMemo} from 'react';
import ProductSearch from '../contents/js/ProductSearch';
import URLModule from '../contents/js/URL';

// CSS
import '../contents/css/Compare/Compare_Router.css';

// Component
import Main from '../components/Compare/Compare_Main';
import { Link, useLocation } from 'react-router-dom';

// Context
import {ProductContext, ServerContext} from '../App';

const Compare = ({history}) => {
    // Context 
    const server = useContext(ServerContext);
    const {productData, setProductData} = useContext(ProductContext)

    // Memo
    const currentProductData = useMemo(() => {
        if(productData === null) return null;
        else {
            return {
                shop : productData?.praw?.domain,
                no : productData?.praw?.code,
            }
        }
    }, [productData]);

    // State
    const [loader, setLoader] = useState(!productData);
    const [status, setStatus] = useState(0);

    // Location
    const search = useLocation().search;

    // Memo
    const _useQuery = useMemo(() => {
        return new URLSearchParams(search);
    }, [search]);
    useEffect(() => { 
        if(!_useQuery.get("shop") || !_useQuery.get("no") || _useQuery.get("shop") !== currentProductData?.shop || _useQuery.get("no") !== currentProductData?.no) {
            (async () => {
                const _ProductSearch = new ProductSearch(server);
                let _searchResult = null;      // 검색한 상품 정보 또는 결과 Status 를 보관할 변수
                if(_useQuery.get("domain")) {
                    //console.log("url 전체를 활용하여 검색");
                    // ?domain= 이 존재
                    const analyze = new URLModule().get(_useQuery.get("domain"));
                    if(!analyze?.shop || !analyze?.no) {
                        return history.replace(`/compare?shop=${analyze.domain}&no=${analyze.code}`)
                    } _ProductSearch.search({url : _useQuery.get("domain")});                    
                } else {
                    _searchResult = await _ProductSearch.search({domain : _useQuery.get("shop"), code : _useQuery.get("no")});
                    //console.log("shop + code를 활용하여 검색");
                }
                try {
                    if(_searchResult.type === 'success') {
                        // 검색 결과 오류
                        setProductData(_searchResult.data);
                    } else {
                        setStatus(_searchResult.status);
                    }
                } catch(err) {
                    setStatus(500);
                } finally {
                    setLoader(false);
                }
            })();
        }
    }, [productData, server, _useQuery]); // useEffect

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
            productData ? (
                <Main 
                    history={history}
                    productData={productData}
                />
            ) : (
                <section id="Compare">
                    {
                        status === 204 ? (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>죄송합니다.</h1>
                                <h1>상품 정보가 없습니다.</h1>
                                <p>입력하신 상품의 사이즈 정보는</p>
                                <p>영업일 기준 2일이내에 자동으로 입력됩니다.</p>
                                <button onClick={() => history.replace("/search")}>다른 상품 검색</button>
                            </div>
                        ) : status === 400 ? (
                            <div className="title">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <h1>죄송합니다.</h1>
                                <h1>문제가 발생했습니다.</h1>
                                <p>잘못된 요청 정보를 전달하였습니다.</p>
                            </div>
                        ) : status === 500 ? (
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