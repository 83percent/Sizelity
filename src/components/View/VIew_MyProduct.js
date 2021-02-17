import React, { useEffect, useState } from 'react';
import Proptype from 'prop-types';
import MyProductData from '../../contents/js/MyProductData';


//CSS
import '../../contents/css/View/View_MyProduct.css';

// Component
import MyProductList from './View_MyProduct_List';


/*
    @param nowType : 현재 비교하려는 상품의 ptype (string)
    @param active : 새로고침 활성화 toggle (boolean)
    @param sectionCloseFunc : section 
    @param setMyProductData : 비교하려는 나의 옷 데이터를 변경하는 함수
*/
let productListData = null;
const MyProduct = ({nowType, sectionCloseFunc, setMyProductData}) => {
    const [myProductListData, setMyProductListData] = useState(undefined);
    const fetchMyProductData = (async() => {
        try {
            console.log("try");
            if(!productListData) productListData = MyProductData;
            const __responseData = await productListData.getListArray();
            setMyProductListData(__responseData);
        } catch(error) {
            console.error(error);
            setMyProductListData(null);
        }
    });
    
    useEffect(() => {
        fetchMyProductData();
    }, []);
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
                    <button>
                        <i className="material-icons" onClick={() => fetchMyProductData()}>refresh</i>
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
    sectionCloseFunc : Proptype.func,
    setMyProductData : Proptype.func.isRequired
}
export default React.memo(MyProduct);