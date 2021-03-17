import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

// Css
import '../contents/css/Router/AfterProduct.css';

// Context 
import {LoginContext}from '../App';


const AfterProduct = ({history}) => {
    const server = 'http://localhost:3001';
    //const server = 'http://192.168.11.2:3001';
    // Context
    const {userInfo} = useContext(LoginContext);
    // State
    const [loader, setLoader] = useState(true);
    const [deleteOption, setDeleteOption] = useState(false);
    const [afterList, setAfterList] = useState(null);

    // Ref
    const reomveWrapper = useRef(null);
    console.log(userInfo);
    if(userInfo === null) {
        history.replace("/wrong");
    } else if(!userInfo || !userInfo._id || !userInfo.sili_p || !userInfo.name) {
        history.replace("/wrong");
    }
    
    const request = {
        getAfterList : async () => {
            if(!userInfo || !userInfo._id || !userInfo.sili_p) return;
            const result = await axios({
                method: 'post',
                url : `${server}/user/getafter`,
                data : {
                    _id : userInfo._id,
                    upwd : userInfo.sili_p
                },
                timeout : 5000
            });
            console.log("요청 결과", {_id : userInfo._id, upwd: userInfo.sili_p});
            console.log("요청 결과 정보",result.data);
            setLoader(false);
            try {
                if(result.data) {
                    setAfterList(result.data);
                } else {
                    setAfterList(null);
                }
            } catch(error) {
                alert("error");
                console.log("error");
                setAfterList(null);
            }
        },
        removeAfterList : async (data) => {
            const result = await axios({
                method: 'post',
                url : `${server}/user/removeafter`,
                data : data,
                timeout : 4000
            });
            console.log("삭제 결과 : ",result);
        }

    }
    const event = {
        removeToggle : () => {
            if(!deleteOption) setDeleteOption(true);
            else event.removeComfirmToggle(true);
        },
        removeCancel : () => {
            event.removeComfirmToggle(false);
            setDeleteOption(false)
        },
        moveCompare : (element) => {
            history.push({
                pathname: "/view/compare",
                search: `?shop=${element.praw.domain}&no=${element.praw.code}`
            });
        },
        removeData : {
            _id : userInfo && userInfo._id ? userInfo._id : null,
            upwd : userInfo && userInfo.sili_p ? userInfo.sili_p : null,
            product : ["asdfsaf"]
        },
        count : 0,
        remove : (_id, e) => {
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
            event.removeData.product.push(_id);
            event.count++;
        },
        removeSend : async () => {
            console.log("삭제할 데이터 : ", event.removeData);
            await request.removeAfterList(event.removeData);
            event.removeComfirmToggle(false);
            setDeleteOption(false);
        },
        removeComfirmToggle : (force) => {
            if(!reomveWrapper.current) return;
            if(force === undefined) force =  !reomveWrapper.current.classList.contains("on");
            if(force) {
                if(event.count > 0) reomveWrapper.current.classList.add("on");
                else setDeleteOption(false);
            } else if(!force) reomveWrapper.current.classList.remove("on");
            
        }
    }
    useEffect(() => {
        request.getAfterList();
    }, []);
    return (
        <section id="After">
            <div className="remove-wrapper" ref={reomveWrapper}>
                <div className="msg">
                    <h1 style={{color:"#ff0000"}}>"삭제"</h1>
                    <h1>하시겠습니까?</h1>
                </div>
                <div className="confirm">
                    <div style={{borderRight:"1px solid #dbdbdb"}} onClick={() => event.removeSend()}>
                        <p>삭제</p>
                    </div>
                    <div onClick={() => event.removeCancel()}>
                        <p>취소 </p>
                    </div>
                </div>
            </div>
            <i className="material-icons back" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <h1>나중에 볼 상품</h1>
                <p>최대 30개 저장</p>
                <p>(30개 초과시 오래된 순서로 자동삭제됩니다)</p>
            </header>
            <article>
                <div className="func-btn-wrapper">
                    <button className={deleteOption ? "on" : ""} onClick={() => event.removeToggle()}>{deleteOption ? "저장" : "삭제"}</button>
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
                                                        <p>{element.info.sname}</p>
                                                        <h1>{element.info.pname}</h1>
                                                    </div>
                                                    <p>{element.info.subtype}</p>
                                                </div>
                                                <a href={`http://${element.praw.full}`}><i className="material-icons">open_in_new</i></a>
                                                <button onClick={(e) => event.remove(element._id,e)} className={deleteOption ? "active" : ""}>
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