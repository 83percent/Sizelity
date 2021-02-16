import React, { useEffect, useState } from 'react';
import Proptype from 'prop-types';
import MyProductData from '../../contents/js/MyProductData';


//CSS
import '../../contents/css/View/View_MyProduct.css';

// Component
import MyProductList from './View_MyProduct_List';

let productListData = null;
const MyProduct = ({nowType, active, sectionCloseFunc, setMyProductData}) => {
    const [refresh, setRefresh] = useState(active);
    const [myProductListData, setMyProductListData] = useState(undefined);
    const refreshEvent = () => {setRefresh(!refresh);}
    const fetchMyProductData = (async() => {
        try {
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
    }, [refresh]);
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
                        <i className="material-icons" onClick={() => refreshEvent()}>refresh</i>
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
    active : Proptype.bool.isRequired,
    sectionCloseFunc : Proptype.func,
    setMyProductData : Proptype.func.isRequired
}
export default React.memo(MyProduct);