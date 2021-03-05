import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import '../contents/css/View/View_Compare_Main.css';

// Component
import Compare from '../components/View/View_Compare';
import MyProduct from '../contents/js/MyProductData';
import NavMyProduct from '../components/View/View_Nav_MyProduct';
import Menu from '../components/View/View_Menu';

// Context
import { MediaContext } from '../App';
import {LoginContext} from '../App';
import axios from 'axios';
import { useCookies } from 'react-cookie';

/*
    - Param
    @param props.location.state.data : 구매예정 상품의 데이터 정보

    - State
    @state myData : 나의 상품정보를 저장하는 state
*/
const ViewCompare = (props) => {
    console.log("%c======= Start Route 'Compare.js' =======\n \t <Component> \t Props = ", "background:#00966B;color:#ffffff;",props);

    const [cookies, setCookies] = useCookies([]);

    // Context 
    const media = useContext(MediaContext);
    const {userInfo} = useContext(LoginContext);

    // Ref
    const menuFrame = useRef(null);
    const favWrapper = useRef(null);

    // State
    const [myData, setMyData] = useState(MyProduct.get());
    const [productData, setProductData] = useState(props.location.state ? props.location.state.data : undefined);
    const __queryConnect = useCallback(async () => {
        // 'history.state.data' 로 데이터가 안넘어옴.
        if(productData === undefined) {
            console.log("%c No Data -- Try get Product data use query.", 'background:red; color:#fff;');
            // prop.location.state 를 못받아옴
            
            const params = new URLSearchParams(props.location.search);
            if(params.has('shop') && params.has('no')) {
                // Query가 일치
                const response = await axios({
                    method:'get',
                    url : `http://localhost:3001/product/get${props.location.search}`,
                    timeout: 3000
                }).catch(() => {
                    return {data : {status : -200}};
                });
                console.log("Server get data use $Query : ",response);
                if(response.data.status) {
                    // 데이터 불러오기 실패
                    switch(response.data.status) {
                        case -200 : {
                            console.log("Server network error...");
                            break;
                        }
                        case 404 : {
                            // No data
                            break;
                        }
                        default : {
                            console.log("NO RESPONSE");
                        }
                    }
                } else if(response.data._id) {
                    // Cookie 저장
                    try {
                        const sname = response.data.info.sname;
                        const pname = response.data.info.pname;
                        let isSame = false;
    
                        let current = cookies.sizelity_currentSearchData;
                        if(current) {
                            for(const element of current) {
                                if(element[0] === sname && element[1] === pname) {
                                    isSame = true;
                                    break;
                                }
                            }
                        } else {
                            current = new Array([]);
                        }
                        if(!isSame) {
                            current.unshift([ response.data.info.sname, response.data.info.pname, response.data.info.subtype, response.data.praw.full]);
                            setCookies("sizelity_currentSearchData",current,{path:"/", maxAge:(500 * 24 * 60 * 60)});
                        }
                    } catch{} finally {
                        setProductData(response.data);
                    }
                } else {
                    // Error 아무데이터도 수신 받지 못함
                    throw new Error("Server get empty data");
                }
                
            } else {
                // Query가 맞지 않음.
            }
        }
    }, [productData]);
    // in history.state.data or ?shop=[domain]&no=[code]
    /*
        1. 데이터가 안넘어 온 경우 - URL Query Check
        2. 데이터가 잘 넘어 온 경우 - 쿼리 체크 할 필요 없음.
    */

    const wrapperToggle = {
        menu : function(force, e) {
            this.__toogle(menuFrame.current, force, e);
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
    

    // ref={favWrapper} wrapper 에서의  handler object
    const fav = {
        myWardrobe: function() {
            const activeSize = document.querySelector("input[type='radio'][name='select-size']:checked");
            if(activeSize) {
                // 사이즈 선택됨
                if(window.confirm(`'${activeSize.value}'로 저장 하시겠습니까?`)) {
                    const saveData = {
                        _id : userInfo._id,
                        upwd: userInfo.sili_p,
                        product : {
                            status : 200,
                            info : productData.info,
                            _url : productData.praw,
                            size : null
                        }
                    }
                    for(const element of productData.size) {
                        if(element.name === activeSize.value) {
                            saveData.product.size = element;
                            break;
                        }
                    }
                    if(saveData.product.size) {
                        console.log(saveData);
                        (async () => {
                            const response = await axios({
                                
                                method: 'post',
                                url : "http://localhost:3001/user/setproduct",
                                data : saveData
                            });
                            console.log(response);
                        })();
                    } else {
                        // 사이즈 선택안됨 : 코드 문제.
                    }
                }
            } else {
                // 사이즈 선택안됨
                alert("사이즈를 선택해주세요.");
            }
        }
    }
    useEffect(() => {
        __queryConnect();
    })
    return (
        <div id="View">
            {
                productData ? (
                    <>
                        <nav id="Compare-nav">
                            <div id="Compare-top">
                                <div  id="logo" className="nav-element" >
                                    <Link to="/view">Sizelity.</Link>
                                </div>
                                <Link to="/view/search" className="nav-element" >
                                    <i className="material-icons">search</i>
                                </Link>
                                <div className="nav-element" onClick={() => wrapperToggle.favorite(true)}>
                                    <i className="material-icons">star_border</i>
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
                                                <button style={{borderRight:"1px solid #dbdbdb"}} onClick={() => fav.myWardrobe()}>나의 옷장</button>
                                                <button>나중에 볼 상품</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <i className="material-icons">lock</i>
                                            <h1>
                                                <b>로그인</b>이 필요해요.
                                            </h1>
                                            <div className="fav-select-login">
                                                <Link to="/view/login">로그인</Link>
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
                        <section id="Menu" onClick={(e) => {wrapperToggle.menu(false,e)}} ref={menuFrame}>
                            <Menu />
                        </section>
                        <NavMyProduct
                            myProductData={myData}
                            setMyProductData={setMyData}/>
                        <Compare
                            productData={productData} 
                            myProduct={myData}/>    
                    
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