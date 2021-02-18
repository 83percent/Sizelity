import { useCallback, useContext, useRef, useState } from 'react';

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
import { Link } from 'react-router-dom';


const ViewCompare = (props) => {
    const media = useContext(MediaContext);
    const userInfo = useContext(LoginContext);

    const searchResultWrapper = useRef(null);
    const menuFrame = useRef(null);
    const favWrapper = useRef(null);

    const [myData, setMyData] = useState(MyProduct.get());
    const [data, setData] = useState(props.location.state.data);
    if(!data) {
        // data state null = wrong access.
    }

    // send component function
    const changeStateData = useCallback((productData) => {
        if(productData.constructor === Object && productData.status === 200) {
            console.log("View_Compare : 데이터를 설정합니다.", productData);
            toggleSearchResult(false);
            setData(productData);
        }
    }, []);
    // Result frame function
    const toggleSearchResult = (toggle) => {
        if(!searchResultWrapper.current) return;
        if(toggle === undefined) searchResultWrapper.current.classList.toggle("active");
        else {
            if(toggle.constructor !== Boolean) throw new Error("'toggleSearchResult' function parameter must Boolean dataformat.");
            searchResultWrapper.current.classList.toggle("active", toggle);
        }
    }
    
    const toggleMenuFrame = (e,toggle) => {
        if(e) e.stopPropagation();
        if(!menuFrame) return;
        if(toggle === undefined) {
            menuFrame.current.classList.toggle("active");
        } else {
            menuFrame.current.classList.toggle("active", toggle);
        }
    }
    const searchFrameClick = () => {
        console.log("ada");
    }
    const toggleFavWrapper = (force) => {
        if(!favWrapper) return;
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
    const fav = {
        myWardrobe: function() {
            const activeSize = document.querySelector("input[type='radio'][name='select-size']:checked");
            if(activeSize) {
                // 사이즈 선택됨
            } else {
                // 사이즈 선택안됨
            }
            console.log(activeSize);
        },
        afterProduct: function() {

        },
        getAccept : function() {

        },
        getLoader : function() {

        },
        getError : function() {

        },
        closeWrapper : function() {

        }
    }
    return (
        <div id="View">
            <nav id="Compare-nav">
                <div id="Compare-top">
                    <Link to="/view/search" id="search-frame" className="nav-element" >
                        <i className="material-icons" onClick={() => {searchFrameClick()}} >search</i>
                    </Link>
                    <div className="nav-element">
                        <i className="material-icons" onClick={() => toggleFavWrapper(true)}>star_border</i>
                    </div>
                    <div className="nav-element" onClick={() => menuFrame.current.classList.add("active")}>
                        <i className="material-icons">menu</i>
                    </div>
                </div>
                <div className="Compare-result-wrapper" ref={searchResultWrapper} onClick={() => {toggleSearchResult()}} >
                    
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
                    (<div className="_blank" onTouchStart={() => toggleFavWrapper(false)}></div>) :
                    (<div className="_blank" onClick={() => toggleFavWrapper(false)}></div>)
                }
            </section>
            <section id="Menu" onClick={(e) => {toggleMenuFrame(e,false)}} ref={menuFrame}>
                <Menu />
            </section>
            <NavMyProduct
                myProductData={myData}
                setMyProductData={setMyData}/>
            <Compare
                productData={data} 
                myProduct={myData}/>    
        </div>
        

    );
}
export default ViewCompare;