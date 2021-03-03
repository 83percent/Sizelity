import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Proptype from 'prop-types';
import MyProductData from '../../contents/js/MyProductData';

//Component
import MyProductComponent from './View_MyProduct';

// Context
import { MediaContext } from '../../App';
import { Link } from 'react-router-dom';

/*
    @param myProductData : 현재 나의 옷 정보가 담긴 Object (in Cookie "my_recently")
    @param setMyProductData : 현재 나의 옷 정보가 담긴 Object state 를 변경하는 함수
*/
let productListData = null;
const NavMyProduct = ({myProductData, setMyProductData}) => {
    const media = useContext(MediaContext);

    const [myProductListData, setMyProductListData] = useState(undefined);
    const [openList, setOpenList] = useState(false);

    const nav = useRef(null);
    const listWrapper = useRef(null);
    const infoFrame = useRef(null);
    const listToggleButton = useRef(null);
    
    const event = {
        toggleListWrapper : function(force) {
            if(listWrapper.current) {
                if(force === undefined) force = !(listWrapper.current.classList.contains("active"));
                listWrapper.current.classList.toggle("active", force);
                setOpenList(force);
            }
        },
        toggleNav : function(force) {
            if(nav.current) {
                if(force === undefined) force = !(nav.current.classList.contains("active"));
                nav.current.classList.toggle("active", force);
            }
        }
    }
    // Override setMyProductData func
    const __setMyProductData = useCallback((myProductData) => {
        if(infoFrame) {
            infoFrame.current.classList.add("off");
            setTimeout(() => {
               setMyProductData(myProductData);
               MyProductData.set(myProductData);
               console.log("%c\t  Cookie set : ", "color: #fff; background: red;", myProductData);
            },300);
            setTimeout(() => {infoFrame.current.classList.remove("off");},400);
        }
    }, [setMyProductData]);
    const __fetchMyProductData = (async() => {
        try {
            if(!productListData) productListData = MyProductData;
            const __responseData = await productListData.getListArray();
            setMyProductListData(__responseData);
        } catch(error) {setMyProductListData(null);}
    });

    useEffect(() => {
        setTimeout(() => { event.toggleNav(true); }, 300)
    }, [myProductData]);
    
    useEffect(() => {
        // 사전 로드 부분
        __fetchMyProductData();
    }, []);
    return (
        <nav id="myProduct-nav" className="" ref={nav}>
            {
                media === "Phone" ?
                <div id="myProduct-wrapper"  onTouchStart={() => event.toggleNav()}></div> : 
                <div id="myProduct-wrapper"  onClick={() => event.toggleNav()}></div> 
            }
            <div id="myProduct-list-wrapper" ref={listWrapper}>
                <MyProductComponent
                    nowType={myProductData ? myProductData.info.ptype : null}
                    myProductListData={myProductListData}
                    sectionCloseFunc={event.toggleListWrapper}
                    setMyProductData={__setMyProductData}
                    refreshEvent={__fetchMyProductData}/>
            </div>
            <div id="myProduct-frame" >
            {
                myProductData ? (
                        <div id="myProduct-infoFrame" ref={infoFrame} onClick={(e) => event.toggleNav(true)}>
                            <div className="myProduct-sizeInfoFrame">
                                <p>{myProductData.size.name}</p>
                            </div>
                            <div className="myProduct-productInfoFrame">
                                <p>{myProductData.info.sname}</p>
                                <h1>{myProductData.info.pname}</h1>
                                <div>
                                    <p>{myProductData.info.ptype}</p>
                                    <b>/</b>
                                    <p>{myProductData.info.subtype}</p>
                                </div>
                            </div>
                            <div className="myProduct-productListToggle" onClick={() => event.toggleListWrapper()} ref={listToggleButton}>
                                <i className={`material-icons ${openList ? "on" : ""}`}>{openList ? 'close' : 'swap_horiz'}</i>
                            </div>
                        </div>
                ) : (
                    <Link to="/view/myproduct" id="myProduct-emptyFrame" ref={infoFrame}>
                        <i className="material-icons">add</i>
                        <p>나의 옷을 골라주세요.</p>
                    </Link>
                )
            }
            </div>
        </nav>
    )
}

NavMyProduct.proptype = {
    myProductData : Proptype.object,
    setMyProductData : Proptype.func.isRequired // 상위 Component의 my product state 를 변경하는 함수
}

export default React.memo(NavMyProduct);