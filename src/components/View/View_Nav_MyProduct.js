import React, { useCallback, useEffect, useRef, useState } from 'react';
import Proptype from 'prop-types';
import MyProductComponent from './VIew_MyProduct';

const NavMyProduct = ({myProductData, setMyProductData}) => {
    const frame = useRef(null);
    const nav = useRef(null);
    const [navToggle, setNavToggle] = useState(true);
    
    const wrapperClick = (e) => {
        e.stopPropagation();
        toggleFrame(false);
        toggleWrapper(false);
    }
    const frameClick = (e) => {
        e.stopPropagation();
        toggleFrame(true);
        toggleWrapper(true);
    }

    const toggleFrame = useCallback((toggle) => {
        if(frame === null || frame.current.id !== "myProduct-frame") {
            console.error("NavMyProduct frame ref is null or not 'myProduct-frame'");
            return;
        }
        const cl = frame.current.classList;
        if(toggle === undefined) cl.contains("active") ? cl.remove("active") : cl.add("active");
        else toggle ? cl.add("active") : cl.remove("active");
        
    }, [frame]);
    const toggleWrapper = useCallback((toggle) => {
        if(nav === null || nav.current.id !== "myProduct-nav") {
            console.error("NavMyProduct nav ref is null or not 'myProduct-nav'");
            return;
        }
        const cl = nav.current.classList;
        if(toggle === undefined) cl.contains("active") ? cl.remove("active") : cl.add("active");
        else toggle ? cl.add("active") : cl.remove("active");
    }, [nav]);
    useEffect(() => {
        setTimeout(() => {
            toggleFrame(true);
        }, 700)
    }, [myProductData]);
    return (
        <nav id="myProduct-nav" className="active" ref={nav}>
            <div id="myProduct-wrapper" onClick={(e) => wrapperClick(e)}>
                
            </div>
            <div id="myProduct-list-wrapper">
                <MyProductComponent />
            </div>
            <div id="myProduct-frame" ref={frame} onClick={(e) => frameClick(e)}>
                <div id="myProduct-infoFrame">
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
            </div>
        </nav>
    )
}

NavMyProduct.proptype = {
    myProductData : Proptype.object,
    setMyProductData : Proptype.func.isRequired // 상위 Component의 my product state 를 변경하는 함수
}

export default React.memo(NavMyProduct);