import React, { useContext, useRef } from 'react';
import Proptype from 'prop-types';


//CSS
import '../../contents/css/View/View_MyProduct.css';

// Component
import MyProductList from './View_MyProduct_List';

// Context 
import {LoginContext} from '../../App';
import { Link } from 'react-router-dom';


/*
    @param nowType : 현재 비교하려는 상품의 ptype (string)
    @param myProductListData : response 데이터 ( array )
    @param sectionCloseFunc : section 
    @param setMyProductData : 비교하려는 나의 옷 데이터를 변경하는 함수
    @param refreshEvent : 새로고침 버튼에 들어갈 function 
*/
const MyProduct = ({nowType, myProductListData,sectionCloseFunc, setMyProductData, refreshEvent}) => {
    const userInfo = useContext(LoginContext);
    const refreshBtn = useRef(null);
    const __refreshEvent  = (e) => {
        if(e) e.stopPropagation();
        if(!refreshBtn) return;

        refreshEvent();
    }
    return (
        <section id="myProduct">
            {
                userInfo ? (
                    <>
                        <nav className="myProduct-nav">
                            <div>
                                <button onClick={() => sectionCloseFunc(false)}>
                                    <i className="material-icons">close</i>
                                </button>
                                <h1>나의 상품</h1>
                            </div>
                            <ul>
                                <li style={{marginRight: "0.5rem"}}>    
                                    <i className="material-icons">add</i>
                                </li>
                                <li ref={refreshBtn} onClick={(e) => __refreshEvent(e)}>
                                    <i className="material-icons" >refresh</i>
                                </li>
                            </ul>
                        </nav>
                        <article>
                            <MyProductList 
                                nowType={nowType}
                                myProductListData={myProductListData}
                                setMyProductData={setMyProductData} />
                        </article>
                    </>
                ) : (
                    <nav className="myProduct-nav">
                        <div>
                            <button onClick={() => sectionCloseFunc(false)}>
                                <i className="material-icons">close</i>
                            </button>
                            <h1>나의 상품</h1>
                            <div className="myProduct-nav-unloginFrame">
                                <i className="material-icons">lock</i>
                                <p><b>로그인</b>이 필요해요.</p>
                                <p>나의 계정에 나의 상품을 저장하여</p>
                                <p>언제, 어디서든 꺼내보세요.</p>
                                <Link to="/view/login" className="myProduct-nav-login">로그인</Link>
                            </div>
                        </div>
                    </nav>
                )
            }
            
            <div className="_blank" onClick={() => sectionCloseFunc(false)}></div>
        </section>
    )
}
MyProduct.proptype = {
    nowType : Proptype.string,
    myProductListData: Proptype.object.isRequired,
    sectionCloseFunc : Proptype.func.isRequired,
    setMyProductData : Proptype.func.isRequired,
    refreshEvent : Proptype.func.isRequired
}
export default React.memo(MyProduct);