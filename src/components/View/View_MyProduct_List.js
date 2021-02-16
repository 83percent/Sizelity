import React, { useCallback } from 'react';
import Proptype from 'prop-types';

const MyProductList = ({nowType, myProductListData, setMyProductData}) => {
    console.log("myProductListData : ", myProductListData);
    const cateClickEvent = (e) => {
        console.log("click");
        if(e.target) {
            let target = e.target;
            let cl = target.classList;
            if(!cl.contains("myProduct-cate")) {
                target = e.target.parentElement;
                cl = target.classList;
            }
            
            if(cl.contains("active")) {
                cl.remove("active");
                toggleInfoFrame(target.nextElementSibling);
            } else {
                let f = document.querySelector("div.myProduct-cate.active");
                if(f) {
                    f.classList.remove("active");
                    f.nextElementSibling.classList.remove("active");
                }
                cl.toggle("active");
                toggleInfoFrame(target.nextElementSibling);
            }
        }
    }
    const toggleNowType = useCallback((type) => {
        try {
            if(!nowType) return false;
            return nowType === type;
        } catch(error) {return false;}
    },[nowType]);
    const toggleInfoFrame = (target) => {
        const tl = target.classList;
        tl.contains("active") ? tl.remove("active") : tl.add("active");
    }

    if(myProductListData === null) {
        return (
            <div></div>
        )
    } else if(myProductListData === undefined) {
        return (
            <div></div>
        )
    } else {
        return (
            myProductListData.map((element, index) => {
//                console.log("\t\t MyProductList Props myProductListData is : ", myProductListData);
                const matchCate = toggleNowType(Object.keys(element)[0]);
                return (
                    <div key={index}>
                        <div className={`myProduct-cate ${matchCate ? "active" : ""}`} onClick={(e) => cateClickEvent(e)}>
                            <p>{Object.keys(element)[0]}</p>
                            <i className="material-icons">arrow_drop_down</i>
                        </div>
                        <ul className={`myProduct-cate-list-frame ${matchCate ? "active" : ""}`}>
                            {
                                element[Object.keys(element)[0]].map((element,index) => {
                                    return (
                                        <li key={index} className="myProduct-cate-infoFrame" onClick={() => setMyProductData(element)}>
                                            <div className="myProduct-cate-sizeInfoFrame">
                                                <p>{element.size.name}</p>
                                            </div>
                                            <div className="myProduct-cate-productInfoFrame">
                                                <p>{element.info.sname}</p>
                                                <h1>{element.info.pname}</h1>
                                                <div>
                                                    <p>{element.info.ptype}</p>
                                                    <b>/</b>
                                                    <p>{element.info.subtype}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            })
        )
    }
    
}

MyProductList.proptype = {
    nowType : Proptype.string,
    myProductListData : Proptype.object.isRequired,
    setMyProductData : Proptype.func.isRequired
}

export default MyProductList;