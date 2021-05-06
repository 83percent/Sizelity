import {useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// CSS
import '../../contents/css/Compare/Compare_Main.css';

// Component
import Compare from './Compare_Article';
import NavMyProduct from './Compare_Nav_MyProduct';
import Menu from './Compare_Menu';

// Context
import { MediaContext } from '../../App';
import { LoginContext } from '../../App';
import { ServerContext } from '../../App';
import { useCookies } from 'react-cookie';


const ViewCompare = ({history, productData}) => {
    const [{sizelity_myRecently}] = useCookies([]);
    // Context 
    const media = useContext(MediaContext);
    const {userInfo} = useContext(LoginContext);
    const server = useContext(ServerContext);

    // Ref
    const menuFrame = useRef(null);
    const favWrapper = useRef(null);
    const afterAlert = useRef(null);


    // Field
    let isAfterRequest = false;
    let isMyProductRequest = false;
    let activeSize = null;


    const wrapperToggle = {
        menu : (force, e) => {
            wrapperToggle.__toogle(menuFrame.current, force, e);
        },
        __toogle : (wrapper, force, e) => {
            if(!wrapper) return;
            if(e) e.stopPropagation();
            if(force === undefined) wrapper.classList.toggle("active");
            else wrapper.classList.toggle("active", force);
        },
        favorite : (force, e) => {
            if(!favWrapper.current) return;
            if(e) e.stopPropagation();
            if(force === undefined) {
                favWrapper.current.classList.toggle("active");
                setTimeout(() => {favWrapper.current.querySelector("article").classList.toggle("active");},50);
            } else {
                if(force) {
                    favWrapper.current.classList.add("active");
                    setTimeout(() => {favWrapper.current.querySelector("article").classList.add("active");},50);
                } else {
                    favWrapper.current.querySelector("article").classList.remove("active");
                    favWrapper.current.classList.remove("active");
                }
            }
        }
    }
    const alert = {
        // type : error || normal || clear
        alertToggle : (force, msg, type) => {
            if(!afterAlert.current) return;
            const cl = afterAlert.current.classList;
            if(force === undefined) force = !cl.contains("on");
            if(force === true) {
                if(msg !== undefined) {
                    if(type === "error" || type === "normal" || type === "clear") {
                        const title = afterAlert.current.querySelector("p.title");
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
        }
    }

    // ref={favWrapper} wrapper 에서의  handler object
    const fav = {
        myWardrobe: function() {
            if(isMyProductRequest) {
                // 해당 상품 추가기록 존재
                wrapperToggle.favorite(false);
                alert.alertToggle(true, "이미 추가된 상품입니다.", "normal");
                return;
            }
            activeSize = document.querySelector("input[type='radio'][name='select-size']:checked");
            if(activeSize) {
                // 사이즈 선택됨
                if(window.confirm(`'${activeSize.value}'로 저장 하시겠습니까?`)) {
                    const saveData = {
                        info : productData.info,
                        praw : productData.praw,
                        size : null
                    }
                    for(const element of productData.size) {
                        if(element.name === activeSize.value) {
                            saveData.size = element;
                            break;
                        }
                    }
                    try {
                        if(saveData.size) {
                            (async () => {
                                const response = await axios({
                                    method: 'post',
                                    url : `${server}/user/product`,
                                    data : saveData,
                                    withCredentials: true,
                                    timeout : 4000
                                }).catch(() => {
                                    return {data : {status : -200}};
                                });;
                                wrapperToggle.favorite(false);
                                if(response.data && response.data.status !== undefined) {
                                    switch(response.data.status) {
                                        case 200 : {
                                            isMyProductRequest = true;
                                            alert.alertToggle(true, "나의 상품에 추가하였습니다.", "clear");
                                            break;
                                        }
                                        case 0 : {
                                            isMyProductRequest = true;
                                            alert.alertToggle(true, "이미 추가된 상품입니다.", "normal");
                                            break;
                                        }
                                        case -1 : {
                                            alert.alertToggle(true, "로그인 후 이용가능합니다.", "error");
                                            break;
                                        }
                                        default : {
                                            alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");        
                                        }
                                    }
                                } else {
                                    // 서버로 부터 넘어오는 데이터의 문제발생 : 서버 확인 요망
                                    alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                                }
                            })();
                        } else {
                            // 사이즈 선택안됨 : 코드 문제.
                            wrapperToggle.favorite(false);
                            alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                        }
                    } catch(error) {
                        console.log(error);
                        wrapperToggle.favorite(false);
                        alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                    }
                    
                }
            } else {
                // 사이즈 선택안됨
                wrapperToggle.favorite(false);
                alert.alertToggle(true, "나의 상품으로 등록할 <b>사이즈를 선택</b>해주세요.", "error");
            }
        }
    }
    const after = {
        set : function() {
            if(isAfterRequest) {
                // 해당 페이지에서 한번 요청한적 있음.
                wrapperToggle.favorite(false);
                alert.alertToggle(true, "이미 추가된 상품입니다.", "normal");
                return;
            }
            /*
            {
                _id : String,
                upwd : String,
                product : {
                    praw : {
                        domain : String,
                        code : String,
                        full : String
                    },
                    info : {
                        sname : String,
                        pname : String,
                        subtype : String
                    }
                }
            }
            */
            if(!userInfo._id) {
                //  로그인 안된 상태
                alert.alertToggle(true, "로그인 후 이용가능 합니다.", "error");
                return;
            }
            try {
                const sendData = {
                    product : {
                        praw : {
                            domain : productData.praw.domain,
                            code : productData.praw.code,
                            full : productData.praw.full
                        },
                        info : {
                            sname : productData.info.sname,
                            pname : productData.info.pname,
                            subtype : productData.info.subtype
                        }
                    }
                };
                ( async () => { 
                    const response = await axios({
                        method: 'post',
                        url : `${server}/user/after`,
                        data : sendData,
                        withCredentials: true,
                        setTimeout: 4000
                    }).catch((err) => {
                        if(err.response?.status) {
                            switch(err.response.status) {
                                case 401 : {
                                    alert.alertToggle(true, "로그인 후 이용가능합니다.", "error");
                                    break;
                                }
                                case 455 : {
                                    alert.alertToggle(true, "최대 50개만 저장 가능합니다..", "error");
                                    break;
                                }
                                case 500 :
                                default : {
                                    alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                                    break;
                                }
                            }
                        } else alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                    }).finally(() => {
                        wrapperToggle.favorite(false);
                    });
                    console.log(response, response?.status === 200);
                    if(response?.status === 200) {
                        isAfterRequest = true;
                        alert.alertToggle(true, "나중에 볼 상품에 추가하였습니다.", "clear");
                        console.log("CALL")
                    }
                })();
            } catch(error) {
                console.log(error);
                wrapperToggle.favorite(false);
                alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                return false;
            }
        }
    }
    return (
        <div id="View">
            {
                productData ? (
                    <>
                        <div className="alertWrapper" ref={afterAlert}>
                            <div className="alertFrame">
                                <p className="title">Test Message</p>
                            </div>
                            {
                                media === "Desktops" ?
                                <div className="alertClose" onClick={() => alert.alertToggle(false)}></div> :
                                <div className="alertClose" onTouchStart={() => alert.alertToggle(false)}></div>
                            }
                        </div>
                        <nav id="Compare-nav">
                            <div id="Compare-top">
                                <div  id="logo" className="nav-element" >
                                    <Link to="/">Sizelity.</Link>
                                </div>
                                <Link to="/search" className="nav-element" >
                                    <i className="material-icons">search</i>
                                </Link>
                                <div className="nav-element" onClick={() => wrapperToggle.favorite(true)}>
                                    <i className="material-icons">bookmark_add</i>
                                </div>
                                <div className="nav-element" onClick={() => menuFrame.current.classList.add("active")}>
                                    <i className="material-icons">menu</i>
                                </div>
                            </div>
                        </nav>
                        <section id="fav-select-wrapper" ref={favWrapper}>
                            <article>
                                {
                                    userInfo ? (
                                        <>
                                            <h1>
                                                <b>어디</b>에 추가할까요?
                                            </h1>
                                            <div className="fav-select-btn">
                                                <button style={{borderRight:"1px solid #dbdbdb"}} onClick={() => fav.myWardrobe()}>
                                                    <i className="material-icons">door_sliding</i>
                                                    <p>나의 옷장</p>
                                                </button>
                                                <button onClick={() => after.set()}>
                                                    <i className="material-icons">watch_later</i>
                                                    <p>나중에 볼 상품</p>
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <i className="material-icons">lock</i>
                                            <h1>
                                                <b>로그인</b>이 필요해요.
                                            </h1>
                                            <div className="fav-select-login">
                                                <Link to="/login">로그인</Link>
                                            </div>
                                        </>
                                    )
                                }
                            </article>
                            {
                                (media === "Phone") ?  
                                (<div className="_blank" onTouchStart={() => wrapperToggle.favorite(false)}></div>) :
                                (<div className="_blank" onClick={() => wrapperToggle.favorite(false)}></div>)
                            }
                        </section>
                        <section id="Menu" ref={menuFrame}>
                            <Menu 
                                closerEvent={wrapperToggle.menu}/>
                        </section>
                        <NavMyProduct
                            myProductData={sizelity_myRecently}
                            history={history}/>
                        <Compare
                            productData={productData} 
                            myProduct={sizelity_myRecently}/>    
                    
                    </>
                ) : (
                    <div className="loaderFrame">
                        <div className="loader"></div>
                    </div>
                )
            }
           </div> 
    );
}
export default ViewCompare;