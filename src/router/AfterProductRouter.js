import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AfterProductModule from '../contents/js/AfterProduct';

// Css
import '../contents/css/AfterProduct.css';

// Context 
import {ServerContext} from '../App';

const AfterProduct = ({history}) => {
    // State
    const [deleteOption, setDeleteOption] = useState(false);
    const [afterList, setAfterList] = useState(undefined);

    // Context
    const server = useContext(ServerContext);

    // Memo
    const afterProductModule = useMemo(() => {
        return new AfterProductModule(server);
    }, [server])

    // Callback
    const getAfterList = useCallback(async () => {
        try {
            const response = await afterProductModule.get();
            if(response?.type === 'error') {
                window.alert(response?.msg);
                setAfterList(null);
            } else {
                setAfterList(response);
            }
        } catch {
            window.alert("상품 목록을 불러올 수 없습니다.");
        }
    }, [afterProductModule])

    // Ref
    const listRef = useRef(null);

    const request = {
        removeAfterList : async (productID, target) => {
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
        if(afterList === undefined) getAfterList();
    }, [afterList, getAfterList]);
    return (
        <section id="After">
            <header>
                <div>
                    <h1>나중에 볼 상품</h1>
                    <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
                </div>
                
                <p>최대 50개 저장됩니다.</p>
                <p>50개 초과시 오래된 순서로 자동삭제됩니다.</p>
            </header>
            <article>
                <div className="func-btn-wrapper">
                    <button onClick={() => event.removeToggle()} className={deleteOption ? 'on' : ''}>
                        <p>{deleteOption ? "저장" : "삭제"}</p>
                    </button>
                </div>
                    {
                        afterList === undefined ? (
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