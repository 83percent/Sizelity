import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AfterProductModule from '../contents/js/AfterProduct';

// Css
import '../contents/css/Router/AfterProduct.css';

// Context 
import {LoginContext ,ServerContext} from '../App';

let afterProductModule = null;
const AfterProduct = ({history}) => {

    // Context
    const {userInfo} = useContext(LoginContext);
    const server = useContext(ServerContext);

    // State
    const [loader, setLoader] = useState(true);
    const [deleteOption, setDeleteOption] = useState(false);
    const [afterList, setAfterList] = useState(null);

    // Ref
    const listRef = useRef(null)
    if(!userInfo || !userInfo._id || !userInfo.name) {
        history.replace("/wrong");
    }
    const request = {
        getAfterList : async () => {
            if(!afterProductModule) afterProductModule = new AfterProductModule(server);
            const response = await afterProductModule.get();
            setLoader(false);
            if(response?.type === 'error') {
                window.alert(response?.msg);
            } else {
                setAfterList(response);
            }
        },
        removeAfterList : async (productID, target) => {
            if(!afterProductModule) afterProductModule = new AfterProductModule(server);
            const response = await afterProductModule.remove(productID);
            if(response) {
                for(let i=0; i<4; ++i) {
                    if(target.nodeName === "LI") break;
                    else target = target.parentElement;
                }
                if(target.nodeName !== "LI") return;
                target.classList.add("remove");
                setTimeout(() => {target.style.display = 'none'},360);
            } else {
                window.alert("잠시 후 다시 시도해주세요.");
            }
        }
    }
    const event = {
        removeToggle : function() {
            setDeleteOption(!deleteOption);
            listRef.current?.classList.toggle("on");
        }, // removeToggle
        moveCompare : function(element) {
            if(deleteOption) this.removeToggle();
            else {
                history.push({
                    pathname: "/view/compare",
                    state : {
                        productData : element
                    }
                });
            }
        }
    }
    useEffect(() => {
        if(afterList === null) request.getAfterList();
    }, []);
    return (
        <section id="After">
            <i className="material-icons back" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <h1>나중에 볼 상품</h1>
                <p>최대 50개 저장됩니다.</p>
                <p>(50개 초과시 오래된 순서로 자동삭제됩니다.)</p>
            </header>
            <article>
                <div className="func-btn-wrapper">
                    <button onClick={() => event.removeToggle()} className={deleteOption ? 'on' : ''}>
                        <p>{deleteOption ? "저장" : "삭제"}</p>
                    </button>
                </div>
                    {
                        loader ? (
                            <div className="loaderFrame">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            (afterList && afterList[0]) ? (
                                <ul ref={listRef}>
                                    {
                                      afterList.map((element, index) => (
                                            <li key={index}>
                                                <div>
                                                    <div className="info-frame" onClick={() => event.moveCompare(element)}>
                                                        <div className="title">
                                                            <p>{element.info.sname}</p>
                                                            <h1>{element.info.pname}</h1>
                                                        </div>
                                                        <p>{element.info.subtype}</p>
                                                    </div>
                                                    <a href={`http://${element.praw.full}`}><i className="material-icons">open_in_new</i></a>
                                                </div>
                                                <button onClick={(e) => request.removeAfterList(element._id, e.target)} className={deleteOption ? "active" : ""}>
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