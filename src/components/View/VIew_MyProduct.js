import React, { useRef } from 'react';
import Proptype from 'prop-types';


//CSS
import '../../contents/css/View/View_MyProduct.css';

// Component
import MyProductList from './View_MyProduct_List';


/*
    @param nowType : 현재 비교하려는 상품의 ptype (string)
    @param myProductListData : response 데이터 ( array )
    @param sectionCloseFunc : section 
    @param setMyProductData : 비교하려는 나의 옷 데이터를 변경하는 함수
    @param refreshEvent : 새로고침 버튼에 들어갈 function 
*/
const MyProduct = ({nowType, myProductListData,sectionCloseFunc, setMyProductData, refreshEvent}) => {
    const refreshBtn = useRef(null);
    const __refreshEvent  = (e) => {
        if(e) e.stopPropagation();
        if(!refreshBtn) return;
        console.log(refreshBtn);

        refreshBtn.current.disabled = true;
    }
    console.log("change");
    return (
        <section id="myProduct">
            <nav className="myProduct-nav">
                <div>
                    <button onClick={() => sectionCloseFunc(false)}>
                        <i className="material-icons">close</i>
                        <p>닫기</p>
                    </button>
                </div>
                <div>
                    <button>
                        <i className="material-icons">search</i>
                    </button>
                    <button>
                        <i className="material-icons">add</i>
                    </button>
                    <button ref={refreshBtn} onClick={(e) => __refreshEvent(e)}>
                        <i className="material-icons" >refresh</i>
                    </button>
                </div>
            </nav>
            <article>
                <MyProductList 
                    nowType={nowType}
                    myProductListData={myProductListData}
                    setMyProductData={setMyProductData} />
            </article>
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