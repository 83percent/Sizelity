import '../contents/css/View/View_AfterProduct.css';
import { useContext, useEffect, useState } from 'react';
import AfterProductData from '../contents/js/AfterProductData';
// Context 
import {LoginContext}from '../App';

const AfterProduct = ({history}) => {
    // Context
    const {userInfo} = useContext(LoginContext);
    // State
    const [loader, setLoader] = useState(true);
    const [deleteOption, setDeleteOption] = useState(false);
    const [afterList, setAfterList] = useState(null);


    const requestAfterList = async () => {
        const afterProductData = new AfterProductData();
        const list = await afterProductData.get();
        setLoader(false);
        setAfterList(list);
    }
    const event = {
        moveCompare : (element) => {
            history.push({
                pathname: "/view/compare",
                search: `?shop=${element.sname}&no=${element.praw.code}`
            });
        },
        remove : (e) => {
            e.stopPropagation();
            let target = e.target;
            let i = 0;
            while(!(target.classList.contains("After-element")) && i < 5) {
                target = target.parentElement;
                i++;
            }
            if(i === 4 && !target.classList.contains("After-element")) return;
            else {
                target.classList.add("remove");
                setTimeout(() => target.remove(),360);
            }
        }
    }
    useEffect(() => {
        requestAfterList();
    }, []);
    if(!userInfo) {
        history.replace("/wrong");
        return null;
    }
    return (
        <section id="After">
            <i className="material-icons back" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <h1>나중에 볼 상품</h1>
                <p>최대 30개 저장</p>
                <p>(30개 초과시 오래된 순서로 자동삭제됩니다)</p>
            </header>
            <article>
                <div className="func-btn-wrapper">
                    <button onClick={() => setDeleteOption(!deleteOption)}>{deleteOption ? "저장" : "삭제"}</button>
                </div>
                    {
                        loader ? (
                            <div className="loaderFrame">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            (afterList && afterList[0]) ? (
                                <ul>
                                    {
                                      afterList.map((element, index) => (
                                            <li key={index} className="After-element">
                                                <div className="After-elementInfoFrame" onClick={() => event.moveCompare(element)}>
                                                    <div className="After-elementInfo">
                                                        <input type="hidden" name="pcode"/>
                                                        <p>{element.sname}</p>
                                                        <h1>{element.pname}</h1>
                                                    </div>
                                                    <p>{element.subtype}</p>
                                                </div>
                                                <a href={`http://${element.praw.full}`}><i className="material-icons">open_in_new</i></a>
                                                <button onClick={(e) => event.remove(e, index)} className={deleteOption ? "active" : ""}>
                                                    <i className="material-icons">remove</i>
                                                </button>
                                            </li>
                                        ))
                                }
                                </ul>
                            ) : (
                                <div className="After-none">
                                    <p>나중에 볼 상품이 없습니다.</p>
                                </div>       
                            )
                        )
                    }
            </article>
        </section>
    )
}
/*
    Data Format
    [
        {
            pcode : "PAAA0001", -- 0
            sname : "string", -- 1
            pname : "string", -- 2
            subtype : "string", -- 3
            praw : {
                full : "string", -- 0
                code : "string" -- 1
            } -- 4
            
        }, ...
    ]
*/
export default AfterProduct;