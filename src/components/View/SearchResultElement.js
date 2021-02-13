import Proptype from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const SearchResultElement = ({ data, loaderClose }) => {
    useEffect(() => {
        loaderClose();
    });

    if(data && data.constructor === Object) {
        console.log("prop data", data);
        switch(data.status) {
            case 200 : {
                // 데이터 존재
                return (
                    <div id="search-result" className="off">
                        <Link to={{
                            pathname: "/view/compare",
                            search: `?shop=${data.info.sname}&no=${data.praw.code}`,
                            state: { data : data }
                        }} onClick={() => clickEvent()}>
                            <div className="ptitle">
                                <p className="sname">{data.info.sname}</p>
                                <h1>{data.info.pname}</h1>
                            </div>
                            <div className="pinfo">
                                <p>{data.info.ptype}</p>
                                <p className="line"></p>
                                <p>{data.info.subtype}</p>
                            </div>
                        </Link>
                    </div>
                );
            }
            case 400 : {
                // 미지원 URL
                return (
                    <div id="search-result" className="result-notice off">
                    <div className="ntitle">
                            <h2>
                                아직 지원하지 않는 쇼핑몰입니다.
                            </h2>
                        </div>
                    </div>
                );
            }
            case 500 : {
                // 데이터 없음
                // 1. 긁어오기 실패시 직접 입력?
                return (
                    <div id="search-result" className="off">
                        <Link to="/view">
                            <div className="ntitle">
                                <h2>
                                    해당 상품의 사이즈 정보가 없습니다.    
                                </h2>
                                <div className="size-add">
                                    <p>직접 입력</p>
                                    <i className="material-icons">add</i>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            }
            default : {
                // Error
                return (
                    <div id="search-result" className="off">
                        <div className="ntitle">
                            <h2>데이터에 오류가 생겨 불러올 수 없습니다.</h2>
                        </div>
                    </div>
                );
            }
        }
    } else {
        // Error 상황인 경우 : When the return of promise reject, data is null
        return (
            <div id="search-result" className="off">
                <div className="ntitle">
                    <h2>오류로 인해 잠시 후 다시 요청해주세요.</h2>
                </div>
            </div>
        );
    }
}
SearchResultElement.proptype = {
    data : Proptype.object.isRequired,
    loaderClose : Proptype.func.isRequired // loader.off => document.getElementById("result-frame")
}

const clickEvent = () => {
    console.log("Click to Search Result Element (Link / react a href)");
}

export default SearchResultElement;