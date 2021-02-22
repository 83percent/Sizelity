import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductData from '../../contents/js/ProductData';

let productData = null;

const SearchResult = ({praw}) => {
    const [response, setResponse] = useState(null);
    const [onLoader, setOnLoader] = useState(false);
    const __fetchSearchData = async (praw) => {
        if(!productData) productData = new ProductData();
        try {
            setOnLoader(true);
            const __response = await productData.get(praw);
            
            setResponse(__response);
            setOnLoader(false);
        } catch(error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if(praw !== null) __fetchSearchData(praw);
    }, [praw]);
    if(onLoader) {
        return (
            <div className="loader"></div>
        )
    } else {
        if(response === null) {
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
                        <Link to={{
                            pathname: "/view/compare",
                            search: `?shop=${response.info.sname}&no=${response.praw.code}`,
                            state: { data : response }
                        }} className="Search-success">
                            <p>{response.info.sname}</p>
                            <h1>{response.info.pname}</h1>
                            <div>
                                <p>{response.info.ptype}</p>
                                <b>/</b>
                                <p>{response.info.subtype}</p>
                            </div>
                        </Link>
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
                case 400 : {
                    return (
                        <div className="Search-none">
                            <i className="material-icons">mood_bad</i>
                            <p>상품정보가 없어요.</p>
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