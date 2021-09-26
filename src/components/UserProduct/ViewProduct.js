import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import ProductType from '../../contents/js/ProductType';

import UserProductModule from '../../contents/js/UserProduct';

// Component
import MyProduct from '../Nav/MyProduct';

// CSS
import '../../contents/css/UserProduct/ViewProduct.css';
import '../../contents/css/Nav/Alert.css';

// Context
import { MediaContext, LoginContext, ServerContext } from '../../App';


const UserProduct = ({history, location}) => {
    /*
        location.state.callback -> 수정 및 추가 완료시 alert을 노출추가를 위해 location 추가했는데
        문제 발생 : 1회성으로 작동하게 하려면 복잡
    */
    // Cookie
    const [{sizelity_myRecently}, setCookie] = useCookies(['sizelity_myRecently']);
    
    // Context
    const { userInfo } = useContext(LoginContext);
    const media = useContext(MediaContext);
    const server = useContext(ServerContext);
    
    // State
    const [productData, setProductData] = useState(undefined);

    // Ref
    const alertWrapper = useRef(null);
    const listRef = useRef(null);
    const optionRef = useRef(null);

    // Field
    const userProductModule = useMemo(() => new UserProductModule(server), [server]);
    
    const analyzeData = useMemo(() => {
        return productData?.reduce((acc, element) => {
            let ptype = element.info?.ptype;
            if(ProductType.supportCate.includes(ptype)) {
                if(!acc[ptype]) acc[ptype] = [];
                acc[ptype].push(element);
            } else {
                if(!acc.unknown) acc.unknown = [];
                acc.unknown.push(element);
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
                setCookie("sizelity_myRecently",data, {path:"/", maxAge:(500 * 24 * 60 * 60)});
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
                        if(['error', 'normal', 'clear'].includes(type)) {
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
            switch(response.type) {
                case 'success' : {
                    setProductData(response.data);
                    break;
                }
                case 'error' : {
                    alert.alertToggle(true, response?.msg , "error");
                    break;
                }
                default : {
                    alert.alertToggle(true, "문제가 발생했어요" , "error");
                    break;
                }
            }
        } // fetchData
        if(userInfo && productData === undefined) fetchData();
    }, [productData, userInfo, alert, userProductModule]);

    useEffect(() => {
        const callback = location.state?.callback;
        if(!callback) return;
        switch(callback?.type) {
            case 'create' : {
                if(callback.state) alert.alertToggle(true, '옷을 추가했어요', 'clear');
                break;
            }
            case 'modify' : {
                if(callback.state) alert.alertToggle(true, '옷 정보를 수정했어요', 'clear');
                break;
            }
            default : break;
        }
    }, [location, alert])
    return (
        <section id="UserProduct">
            <nav id="alert-wrapper" ref={alertWrapper}>
                <div>
                    <p className="title"></p>
                </div>
                {
                    media === "Desktops" ?
                    <aside onClick={() => alert.alertToggle(false)}></aside> :
                    <aside onTouchStart={() => alert.alertToggle(false)}></aside>
                }
            </nav>
            <header>
                <div className="title">
                    <h1 className="name">{userInfo?.name ? userInfo.name : "XXX"}</h1>
                    <h1>님의 옷장</h1>
                </div>
                <i className="material-icons" style={{fontSize: "2.2rem"}}onClick={() => history.push('/closet/create')}>add</i>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <article>
                {
                    productData !== undefined ? 
                        productData.length > 0 ? (
                            <div className="list-wrapper" ref={listRef}>
                                <div className="list-nav">
                                    <button ref={optionRef} onClick={() => event.toggleOption()}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                </div>
                                {
                                    analyzeData ? (
                                        ProductType.supportCate.map((type, i1) => {
                                            if(analyzeData[type]?.length > 0) {
                                                return (
                                                    <div key={i1} className="list-frame">
                                                        <div className="cate-nav" onClick={(e) => event.listToggle(e.target)}>
                                                            <p>{ProductType.getTypeName(type)}</p>
                                                            <i className="material-icons">keyboard_arrow_down</i>
                                                        </div>
                                                        <ul>
                                                            {
                                                                analyzeData[type].map((element, i2) => {
                                                                    console.log(element)
                                                                    const {
                                                                        _id,
                                                                        info : {sname, nick, pname, subtype},
                                                                        size : {name}
                                                                     } = element;
                                                                    return (
                                                                        <li key={i2} >
                                                                            <div className="info-frame" onClick={(e) => event.elementClick(element, e)}>
                                                                                <div className="size-name">
                                                                                    <h2>{name}</h2>
                                                                                </div>
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
                                                                                        <a href={`http://${element?.praw?.full}`} onClick={(e) => e.stopPropagation()}>
                                                                                            <i className="material-icons">open_in_new</i>
                                                                                        </a> 
                                                                                    ) : null
                                                                                }
                                                                            </div>
                                                                            <div className="btn-wrapper">
                                                                                <button style={{backgroundColor: "#00966B"}} onClick={() => event.modifyMyProduct(element)}>
                                                                                    <i className="material-icons">edit</i>
                                                                                </button>
                                                                                <button style={{backgroundColor: "#dd1818"}} onClick={(e) => event.removeMyProduct(e.target, _id)}>
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
                                <i className="material-icons">sentiment_dissatisfied</i>
                                <p>옷장이 비었어요</p>
                                <p><b style={{fontWeight:"500"}}>{userInfo?.name}님의 옷장</b>을 채워주세요.</p>
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
            <MyProduct myProductData={sizelity_myRecently} history={history}/>
        </section>
    )
}

export default UserProduct;
