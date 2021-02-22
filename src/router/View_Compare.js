import { useContext, useMemo, useRef, useState } from 'react';
import ProductSearch from '../contents/js/ProductSearch';
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

/*
    - Param
    @param props.location.state.data : 구매예정 상품의 데이터 정보

    - State
    @state myData : 나의 상품정보를 저장하는 state
*/
const ViewCompare = (props) => {
    console.log("%c======= Start Route 'Compare.js' =======\n \t <Component> \t Props = ", "background:#00966B;color:#ffffff;",props);
    // Context 
    const media = useContext(MediaContext);
    const {userInfo} = useContext(LoginContext);

    // Ref
    const menuFrame = useRef(null);
    const favWrapper = useRef(null);

    // State
    const [myData, setMyData] = useState(MyProduct.get());
    const [productData, setProductData] = useState(props.location.state ? props.location.state.data : null);
    
    /*
        1. 데이터가 안넘어 온 경우 - URL Query Check
        2. 데이터가 잘 넘어 온 경우 - 쿼리 체크 할 필요 없음.
    */
    const productSearch = new ProductSearch();
    if(!productData) {
        /*
            1. 데이터그 안넘어 온 경우
            1-1. URL Query check
            - 쿼리도 존재하지 않는 경우 => 메인으로
            - 쿼리가 존재하는 경우
                - 서버에 데이터가 존재하지 않는 경우 : 메인으로 (none 데이터를 포함하고 넘어가 메인에 없다는 표시 띄움)
                - 서버에 데이터가 존재하는 경우 : 정상 작동
        */
        
        (async () => {
            try {
                const data = await productSearch.searchQuery(props.location.search);
                console.log("%c ProductData is not coming. search use query","background:red;color: #fff;", props.location.search);
                if(data) {
                    productSearch.setCurrent(data);
                    setProductData(data);
                } else {
                    props.history.replace("/wrong");
                    return null;    
                }
            } catch(error) {
                props.history.replace("/wrong");
                return null;
            }
        })();
    } else {
        productSearch.setCurrent(productData);
    }

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
            } else {
                // 사이즈 선택안됨
            }
            console.log(activeSize);
        }
    }
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