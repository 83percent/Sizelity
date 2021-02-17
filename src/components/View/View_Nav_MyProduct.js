import React, {useCallback, useEffect, useRef} from 'react';
import Proptype from 'prop-types';
import MyProductData from '../../contents/js/MyProductData';

//Component
import MyProductComponent from './View_MyProduct';
/*
    @param myProductData : 현재 나의 옷 정보가 담긴 Object (in Cookie "my_recently")
    @param setMyProductData : 현재 나의 옷 정보가 담긴 Object state 를 변경하는 함수
*/
const NavMyProduct = ({myProductData, setMyProductData}) => {
    let isOpenFrame = false;

    const nav = useRef(null);
    const listWrapper = useRef(null);
    const infoFrame = useRef(null);
    
    const navCloseEvent = (e) => {
        e.stopPropagation();
        toggleWrapper(false);
        isOpenFrame = false;
    }
    const frameClick = (e) => {
        e.stopPropagation();
        if(isOpenFrame) {
            toggleListWrapper();
        } else {
            toggleWrapper(true);
            isOpenFrame = true;
        }
    }
    //Override setMyProductData func
    const __setMyProductData = useCallback((myProductData) => {
        if(infoFrame) {
            infoFrame.current.classList.add("off");
            setTimeout(() => {
               setMyProductData(myProductData);
               MyProductData.set(myProductData);
               console.log("%c\t  Cookie set : ", "color: #fff; background: red;", myProductData);
            },300);
            setTimeout(() => {
                infoFrame.current.classList.remove("off");
             },400);
        }
    }, [setMyProductData]);
    const toggleListWrapper = (toggle) => {
        if(!listWrapper) return;
        const cl = listWrapper.current.classList;
        if(toggle === undefined) cl.toggle("active"); 
        else cl.toggle("active",toggle);
    }
    const toggleWrapper = (toggle) => {
        if(nav === null || nav.current.id !== "myProduct-nav") {
            console.error("NavMyProduct nav ref is null or not 'myProduct-nav'");
            return;
        }
        const cl = nav.current.classList;
        if(toggle === undefined) cl.toggle("active"); 
        else cl.toggle("active",toggle); 
    }
    useEffect(() => {
        setTimeout(() => { toggleWrapper(true);  }, 300)
    }, [myProductData]);
    return (
        <nav id="myProduct-nav" className="" ref={nav}>
            <div id="myProduct-wrapper" onClick={(e) => navCloseEvent(e)}></div>
            <div id="myProduct-list-wrapper" ref={listWrapper}>
                <MyProductComponent
                    nowType={myProductData ? myProductData.info.ptype : null}
                    sectionCloseFunc={toggleListWrapper}
                    setMyProductData={__setMyProductData}/>
            </div>
            <div id="myProduct-frame" onClick={(e) => frameClick(e)}>
            {
                myProductData ? (
                        <div id="myProduct-infoFrame" ref={infoFrame}>
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
                        </div>
                ) : (
                    <div id="myProduct-emptyFrame" ref={infoFrame}>
                        <i className="material-icons">add</i>
                        <p>나의 옷을 골라주세요.</p>
                    </div>
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