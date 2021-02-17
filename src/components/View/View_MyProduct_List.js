import React from 'react';
import Proptype from 'prop-types';


/*
    @param nowType : 현재 비교하려는 상품의 ptype
    @param myProductListData : map을 통해 리스트를 만들어 줄 수 있는 Object로 이루어진 Array
    @param setMyProductData : 비교하려는 나의 옷 데이터를 변경하는 함수
*/
const MyProductList = ({nowType, myProductListData, setMyProductData}) => {
    const cateClickEvent = (e) => {
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
    const toggleNowType = (type) => {
        try {
            if(!nowType) return false;
            return nowType === type;
        } catch(error) {return false;}
    }
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
                //console.log("\t\t MyProductList Props myProductListData is : ", myProductListData);
                const matchCate = toggleNowType(Object.keys(element)[0]);
                return (
                    <div key={index}>
                        <div className={`myProduct-cate ${matchCate ? "active" : ""}`} onClick={(e) => cateClickEvent(e)}>
                            <p>{Object.keys(element)[0]}</p>
                            <i className="material-icons">arrow_drop_down</i>
                        </div>
                        <ul className={`myProduct-cate-list-frame ${matchCate ? "active" : ""}`}>
                            {
                                element[Object.keys(element)[0]].length > 0 ? (
                                    element[Object.keys(element)[0]].map((element,index) => (
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
                                    ))
                                ) : (
                                    <li className="myProduct-cate-infoFrame myProduct-cate-emptyFrame">
                                        <div>
                                            <p>비어있어요</p>
                                            <div>
                                                <i className="material-icons">add</i>
                                                <p>내 옷 등록하기.</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            })
        )
    }
    
}

MyProductList.proptype = {
    nowType: Proptype.string,
    myProductListData: Proptype.object.isRequired,
    setMyProductData: Proptype.func.isRequired
}

export default React.memo(MyProductList);