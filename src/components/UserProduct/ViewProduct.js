import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Transition from '../../contents/js/TransitionSizeName';
import { Link } from 'react-router-dom';

// CSS
import '../../contents/css/UserProduct/ViewProduct.css';
import '../../contents/css/MyProductNav.css';

// Context
import { MediaContext } from '../../App';
import { LoginContext } from '../../App';
import { ServerContext } from '../../App';


let transition = null;
const UserProduct = ({history}) => {
    const backIsCompare = history.location.state ? history.location.state.isCompare : false;
    //const comparePtype = history.location.state ? history.location.state.ptype : null; -> 

    // Cookie
    const [{sizelity_myRecently}, setCookie] = useCookies(['sizelity_myRecently']);
    const cookie = sizelity_myRecently;

    // Context
    const { userInfo } = useContext(LoginContext);
    const media = useContext(MediaContext);
    const server = useContext(ServerContext);
    
    // State
    const [productData, setProductData] = useState(null);

    // Ref
    const alertWrapper = useRef(null);
    const confirmWrapper = useRef(null);
    const deleteBtn = useRef(null);
    const modifyBtn = useRef(null);

    // Field
    if(!transition) transition = new Transition("KOR");
    const cate = ["set","outer","top","bottom"]; // 지원 항목
    let mode = 1; // -1 : delete mode / 0 : modify mode / 1 : cookie change mode
    let removeData = {
        product : null,
        frame : null
    };
    
    // Analyze ProductData
    const analyzeData = ((data) => {
        if(!data || data.length < 1) return null;
        else {
            const result = {};
            for(const element of data) {
                if(element.info.ptype) {
                    if(!result[element.info.ptype]) result[element.info.ptype] = [];
                    result[element.info.ptype].push(element);
                }
            }
            return result;
        }
    })(productData);
    const event = {
        listToggle : (e, force) => {
            if(!e) return;
            e.stopPropagation();
            //const frame = e.target.parentElement.classList.conatain("list-frame") ? e.target.parentElement : null;
            let frame = e.target;
            for(let i = 0; i<4; i++) {
                frame = frame.parentElement;
                if(frame.classList.contains("list-frame")) break;
            }
            if(force === undefined) force = !frame.classList.contains("on");
            frame.classList.toggle("on",force);
            
        },
        elementClick : (data, e) => {
            e.stopPropagation();
            console.log(mode);
            switch(mode) {
                case 1 : {
                    setCookie("sizelity_myRecently",data,{path:"/", maxAge:(500 * 24 * 60 * 60)});
                    break;
                }
                case 0 : {
                    history.push({
                        pathname: '/closet/add',
                        state: {
                            data,
                            mode : "modify"
                        }
                    })
                    break;
                }
                case -1 : {
                    let frame = e.target;
                    if(!frame.classList.contains("list")) {
                        for(let i=0; i < 5; i++) {
                            frame = frame.parentElement;
                            if(frame.classList.contains("list")) break;
                        }
                    }
                    if(!frame.classList.contains("list")) return;
                    removeData.product = data;
                    removeData.frame = frame;
                    alert.confirmToggle(true, data, "error");
                    break;
                }
                default : {}
            }
        },
        delete : {
            mode : (force) => {
                if(!deleteBtn.current) return;
                if(force === undefined) force = !deleteBtn.current.classList.contains("on");
                if(force) {
                    if(mode === 0) {
                        // Delete mode 활성화 상태 -> 종료 해줘야함.
                        if(!modifyBtn.current) return;
                        modifyBtn.current.classList.remove("on");
                    }
                    deleteBtn.current.classList.add("on");
                    alert.alertToggle(true,"삭제모드 : 삭제하려는 상품을 선택해주세요.","error");
                    mode = -1
                } else {
                    deleteBtn.current.classList.remove("on");
                    alert.alertToggle(true,"삭제모드를 종료합니다.","error");
                    mode = 1
                }
            }
        },
        deleteCancel : () => {
            removeData.frame = null;
            removeData.product = null;
            alert.confirmToggle(false);
        },
        elementDelete : async () => {
            alert.confirmToggle(false);
            if(removeData.product) { //Confirm 오픈시 저장되는 데이터 (Field - let removeData = null;)
                const response = await axios({
                    method : 'delete',
                    url : `${server}/user/product/${removeData.product._id}`,
                    withCredentials: true,
                    timeout: 3500
                }).catch(() => {
                    return {data : {status : -100}};
                });
                console.log("삭제 결과 : ", response);
                if(!response || !response.data || !response.status) {
                    alert.alertToggle(true, "오류가 발생했습니다.", "error");
                }
                switch(response.data.status) {
                    case 200 : {
                        if(removeData.frame) removeData.frame.classList.add("remove");
                        break;
                    }
                    case -1 : {
                        alert.alertToggle(true,"잘못된 접근입니다.","error");
                        break;
                    }
                    case -100 : {
                        alert.alertToggle(true, "네트워크 오류!", "error");
                        break;
                    }
                    case -200 : {
                        alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                        break;
                    }
                    default : {
                        alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                    }
                }
            } else {
                alert.alertToggle(true,"실패하였습니다.","error");
            }
        },
        modify : {
            mode : (force) => {
                if(!modifyBtn.current) return;
                if(force === undefined) force = !modifyBtn.current.classList.contains("on");
                if(force) {
                    if(mode === -1) {
                        // Delete mode 활성화 상태 -> 종료 해줘야함.
                        if(!deleteBtn.current) return;
                        deleteBtn.current.classList.remove("on");
                    }
                    modifyBtn.current.classList.add("on");
                    alert.alertToggle(true,"수정모드 : 수정하려는 상품을 선택해주세요.","normal");
                    mode = 0;
                } else {
                    modifyBtn.current.classList.remove("on");
                    alert.alertToggle(true,"수정모드를 종료합니다.","normal");
                    mode = 1
                }
            },
            click : () => {
                
            }
        }
    }
    const alert = {
        // type : error || normal || clear
        alertToggle : (force, msg, type) => {
            if(!alertWrapper.current) return;
            const cl = alertWrapper.current.classList;
            if(force === undefined) force = !cl.contains("on");
            if(force === true) {
                if(msg !== undefined) {
                    if(type === "error" || type === "normal" || type === "clear") {
                        const title = alertWrapper.current.querySelector("p");
                        if(title) {
                            title.innerHTML = msg;
                            title.classList.remove("error", "normal", "clear");
                            title.classList.add(type);
                        }
                    }
                }
                cl.add("on");
            } else {
                cl.remove("on");
            }
        },
        confirmToggle : (force, data, type) => {
            if(!confirmWrapper.current) return;
            const cl = confirmWrapper.current.classList;
            if(force === undefined) force = !cl.contains("on");
            if(force === true) {
                if(data !== undefined) {
                    if(type === "error" || type === "normal" || type === "clear") {
                        const title = confirmWrapper.current.querySelector("q");
                        if(title) {
                            title.innerHTML = data.info.nick ? data.info.nick : data.info.pname ? data.info.pname : null;
                            title.classList.remove("error", "normal", "clear");
                            title.classList.add(type);
                        }
                    }
                }
                cl.add("on");
            } else {
                cl.remove("on");
            }
        }
    }
    useEffect(() => {
        if(!userInfo) return;
        console.log("%c Request My Fav Product Data !!", "background: black; color: #fff;");
        if(productData === null) {
            try {
                (async () => {
                    if(userInfo._id) {
                        const response = await axios({
                            method: 'get',
                            url: `${server}/user/product`,
                            withCredentials: true,
                            timeout: 3500
                        }).catch(() => {
                            console.log("ERROR");
                            alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                            return;
                        });
                        if(response && response.data) {
                            setProductData(response.data);
                        } else return;
                    } else {
                        return null;
                    }
                })();
            } catch {
                alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
            }
        }
    }, [productData, userInfo]);
    return (
        <section id="UserProduct">
            <div className="alertWrapper" ref={alertWrapper}>
                <div className="alertFrame">
                    <p></p>
                </div>
                {
                    media === "Desktops" ?
                    <div className="alertClose" onClick={() => alert.alertToggle(false)}></div> :
                    <div className="alertClose" onTouchStart={() => alert.alertToggle(false)}></div>
                }
            </div>
            <div className="confirmWrapper" ref={confirmWrapper}>
                <div className="confirmFrame">
                    <div>
                        <q></q>
                        <h1>삭제하시겠습니까?</h1>
                    </div>
                    <ul>
                        <li style={{color:"#ff0000"}} onClick={() => event.elementDelete()}>삭제</li>
                        <li onClick={() => event.deleteCancel()}>취소</li>
                    </ul>
                </div>
                {
                    media === "Desktops" ?
                    <div className="alertClose" onClick={() => alert.confirmToggle(false)}></div> :
                    <div className="alertClose" onTouchStart={() => alert.confirmToggle(false)}></div>
                }
            </div>
            <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <div className="title">
                    <h1 className="name">{userInfo ? userInfo.name : "XXX"}</h1>
                    <h1>님의 옷장</h1>
                </div>
                <Link to="/closet/add">
                    <i className="material-icons">add</i>
                    <p>추가</p>
                </Link>
            </header>
            <article>
                {
                    productData ? 
                        productData.length > 0 ? (
                            <div className="list-wrapper">
                                <div className="list-nav">
                                    <div className="delete" onClick={() => event.delete.mode((mode !== -1))} ref={deleteBtn}>
                                        <i className="material-icons">delete</i>
                                    </div>
                                    <div className="modify" onClick={() => event.modify.mode((mode !== 0))} ref={modifyBtn}>
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                </div>
                                {
                                    analyzeData ? (
                                        cate.map((c, i1) => {
                                            if(analyzeData[c] && analyzeData[c].length > 0) {
                                                return (
                                                    <div key={i1} className="list-frame">
                                                        <div className="cate-nav" onClick={(e) => event.listToggle(e)}>
                                                            <p>{transition.getCate(c)}</p>
                                                            <i className="material-icons">keyboard_arrow_down</i>
                                                        </div>
                                                        <ul>
                                                            {
                                                                analyzeData[c].map((element, i2) => {
                                                                    return (
                                                                        <li key={i2} className="list" onClick={(e) => event.elementClick(element, e)}>
                                                                            <div className="size">
                                                                                <p>{element.size.name}</p>
                                                                            </div>
                                                                            <div className="info">
                                                                                <p>{element.info.sname ? element.info.sname : ""}</p>
                                                                                <h1>{element.info.nick ? element.info.nick : element.info.pname}</h1>
                                                                                {element.info.nick ? element.info.pname ? <h2>{element.info.pname}</h2> : null : null}
                                                                            </div>
                                                                            <div className="type">
                                                                                <p>{element.info.subtype}</p>
                                                                            </div>
                                                                            {element?.praw?.full ? 
                                                                                <div className="link">
                                                                                    <a href={`http://${element.praw.full}`} onClick={(e) => e.stopPropagation()}>
                                                                                        <i className="material-icons">open_in_new</i>
                                                                                    </a>
                                                                                </div> : null}
                                                                            <div className="btn-wrapper">

                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            } else return null;
                                        })
                                    ) : (
                                        <div></div>
                                    )
                                }

                            </div>
                        ) : (
                            <div className="empty">
                                <i className="material-icons">insert_emoticon</i>
                                <p><b style={{fontWeight:"500"}}>{userInfo.name}님의 상품</b>을 추가해주세요.</p>
                                <button onClick={() => event.add()}>추가하기</button>
                            </div>
                        )
                     : (
                        <div className="loaderFrame">
                            <div className="loader"></div>
                        </div>
                    )
                    }
            </article>
            <nav className="myProductNav">
                {
                    cookie ? (
                        <>
                            <div className="size">
                                <p>{cookie.size.name}</p>
                            </div>
                            <div className="info">
                                <p>{cookie.info.sname ? cookie.info.sname : null}</p>
                                <h1>{cookie.info.nick ? cookie.info.nick : cookie.info.pname ? cookie.info.pname : null}</h1>
                                <div>
                                    <p>{transition.getCate(cookie.info.ptype)}</p>
                                    <b>/</b>
                                    <p>{cookie.info.subtype ? cookie.info.subtype : null}</p>
                                </div>
                            </div>
                            {
                                backIsCompare ? <div className="changeBtn active" onClick={() => history.goBack()}>
                                    <i className="material-icons">close</i>
                                </div> : null
                            }
                        </>
                    ) : (
                        <div className="empty">
                            <p>다른 상품과 비교할 상품을 골라주세요.</p>
                        </div>
                    )
                }
                
            </nav>
        </section>
    )
}

export default UserProduct;
