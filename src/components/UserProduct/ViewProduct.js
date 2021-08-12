import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import Transition from '../../contents/js/TransitionSizeName';
import UserProductModule from '../../contents/js/UserProduct';

// CSS
import '../../contents/css/UserProduct/ViewProduct.css';
import '../../contents/css/MyProductNav.css';

// Context
import { MediaContext, LoginContext, ServerContext } from '../../App';


let transition = null;
const UserProduct = ({history, location}) => {
    const backIsCompare = location?.state?.isCompare;
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
    const listRef = useRef(null);
    const optionRef = useRef(null);

    // Field
    const userProductModule = useMemo(() => new UserProductModule(server), [server]);
    if(!transition) transition = new Transition("KOR");
    const cate = ["set","outer","top","bottom"]; // 지원 항목
    
    
    const analyzeData = useMemo(() => {
        return productData?.reduce((acc, element) => {
            let ptype = element.info.ptype;
            if(ptype) {
                if(!acc[ptype]) acc[ptype] = [];
                acc[ptype].push(element);
            }
            return acc;
        }, {});
    }, [productData]);

    const event = {
        listToggle : (target) => {
            for(let i=0; i<5; i++) {
                if(target.classList.contains("list-frame")) break;
                else target = target.parentElement;
            }
            target.classList.toggle("on");
        }, // listToggle(target)
        elementClick : function(data, e) {
            e.stopPropagation();
            if(listRef.current.classList.contains("on")) {
                this.toggleOption();
            } else {
                setCookie ("sizelity_myRecently",data,{path:"/", maxAge:(500 * 24 * 60 * 60)});
            }
        }, // elementClick
        toggleOption : function() {
            optionRef.current.classList.toggle("on")
            listRef.current.classList.toggle("on");
        }, // toggleOption(target)
        removeMyProduct : async function(target, productID) {
            if(!window.confirm("삭제 할까요?")) return;
            for(let i=0; i<5; ++i) {
                if(target.nodeName === 'LI') break;
                else target = target.parentElement;
            }
            if(target.nodeName !== 'LI') return;
            const result = await userProductModule.remove(userInfo._id, productID);
            if(result) {
                target.classList.add('remove');
            } else return;
            
        }, // removeMyProduct()
        modifyMyProduct : async function(data) {
            history.push({
                pathname: '/closet/create',
                state: {
                    data,
                    mode : "modify"
                }
            });
        }, // modifyMyProduct
        
    } // event
    const alert = useMemo(() => {
        return {
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
            } // alertToggle
        }
    }, [])
    useEffect(() => {
        async function fetchData() {
            const response = await userProductModule.get(userInfo._id);
            console.log(response.constructor);
            if(response.constructor === Array) {
                setProductData(response);
            } else {
                switch(response) {
                    case 0 : {
                        alert.alertToggle(true, "인터넷 연결을 확인하세요.", "error");
                        break;
                    }
                    case 400 : {
                        alert.alertToggle(true, "인터넷 연결을 확인하세요.", "error");
                        break;
                    }
                    case 401 : {
                        alert.alertToggle(true, "로그인 후 이용가능합니다..", "error");
                        break;
                    }
                    case 500 :
                    default : {
                        console.log(response);
                        alert.alertToggle(true, "잠시 후 다시 시도해주세요.", "error");
                    }
                }
            }
        } // fetchData
        if(userInfo && productData === null) fetchData();
    }, [productData, userInfo, alert, userProductModule]);
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
            <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <div className="title">
                    <h1 className="name">{userInfo?.name ? userInfo.name : "XXX"}</h1>
                    <h1>님의 옷장</h1>
                </div>
                <Link to="/closet/create">
                    <i className="material-icons">add</i>
                    <p>추가</p>
                </Link>
            </header>
            <article>
                {
                    productData ? 
                        productData.length > 0 ? (
                            <div className="list-wrapper" ref={listRef}>
                                <div className="list-nav">
                                    <button ref={optionRef} onClick={() => event.toggleOption()}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                </div>
                                {
                                    analyzeData ? (
                                        cate.map((c, i1) => {
                                            if(analyzeData[c] && analyzeData[c].length > 0) {
                                                return (
                                                    <div key={i1} className="list-frame">
                                                        <div className="cate-nav" onClick={(e) => event.listToggle(e.target)}>
                                                            <p>{transition.getCate(c)}</p>
                                                            <i className="material-icons">keyboard_arrow_down</i>
                                                        </div>
                                                        <ul>
                                                            {
                                                                analyzeData[c].map((element, i2) => {
                                                                    const {sname, nick, pname, subtype} = element.info;
                                                                    return (
                                                                        <li key={i2} >
                                                                            <div className="info-frame" onClick={(e) => event.elementClick(element, e)}>
                                                                                <h2>{element.size.name}</h2>
                                                                                <div className="info">
                                                                                    <p>{sname ? sname : ""}</p>
                                                                                    <h1>{nick ? nick : pname}</h1>
                                                                                    {nick ? pname ? <h2>{pname}</h2> : null : null}
                                                                                </div>
                                                                                <div className="type">
                                                                                    <p>{subtype}</p>
                                                                                </div>
                                                                                {
                                                                                    element?.praw?.full ? (
                                                                                        <a href={`http://${element.praw.full}`} onClick={(e) => e.stopPropagation()}>
                                                                                            <i className="material-icons">open_in_new</i>
                                                                                        </a> 
                                                                                    ) : null
                                                                                }
                                                                            </div>
                                                                            <div className="btn-wrapper">
                                                                                <button style={{backgroundColor: "#00966B"}} onClick={() => event.modifyMyProduct(element)}>
                                                                                    <i className="material-icons">edit</i>
                                                                                </button>
                                                                                <button style={{backgroundColor: "#dd1818"}} onClick={(e) => event.removeMyProduct(e.target, element._id)}>
                                                                                    <i className="material-icons">delete</i>
                                                                                </button>
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
                                <p><b style={{fontWeight:"500"}}>{userInfo.name}님의 옷장</b>을 채워주세요.</p>
                                <Link to="/closet/create">내 옷 추가하기</Link>
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
