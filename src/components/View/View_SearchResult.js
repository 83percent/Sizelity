import React, { useEffect, useState } from "react";
import ProductData from '../../contents/js/ProductData';

let productData = null;
const SearchResult = ({praw}) => {
    const [response, setResponse] = useState(null);
    const [onLoader, setOnLoader] = useState(false);
    console.log("%c call","background:red")
    const __fetchSearchData = async () => {
        if(!productData) productData = new ProductData();
        try {
            setOnLoader(true);
            console.log("%c call","background:blue")

            const __response = await productData.get(praw);
            setResponse(__response);
            setOnLoader(false);
        } catch(error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if(praw !== null) __fetchSearchData();
    }, [praw]);
    console.log("반응 값", response);
    if(onLoader) {
        return (
            <div>loader</div>
        )
    } else {
        if(response === null) {
            return (
                <h1 className="logo">Sizelity.</h1>
            )
        } else {
            switch(response.status) {
                case 200 : {
                    return (
                        <div>있음</div>
                    )
                }
                case 400 : {
                    return (
                        <div>없음</div>
                    )
                }
                default : {
                    return (
                        <div>오류</div>
                    )
                }
            }
        }
    }
}
export default React.memo(SearchResult);