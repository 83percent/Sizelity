import React, { useEffect, useRef, useState } from 'react';
import Proptype from 'prop-types';

// CSS
import '../../contents/css/View/View_Compare.css';

// Component
import CompareGraphList from "./View_Compare_List";

const Compare = ({productData, myProduct}) => {
    // data에 온전하지 못한 정보가 담겨 올 것을 대비해 데이터 검증.js 를 만들어 
    // 검증 후 지금의 Component를 화면에 출력 / 그렇지 못한 경우 데이터가 없다는 페이지로 이동
    const [activeSize, setActiveSize] = useState(null);

    const viewTypeEvent = (e) => {
        // 그래프만 보기
        const status = e.target.classList.contains("active");
        if(status) {
            // 활성화 상태 : 그래프만 보임
            
            e.target.classList.remove("active");
            const frameArr = document.getElementsByClassName("compare-result");
            if(frameArr.length > 0) {
                Array.from(frameArr).forEach(element => {
                    element.classList.remove("none");
                });
            }
        } else {
            // 비활성화 상태 : 결과도 같이 보임 -> 그래프만 보이게 display:none
            
            e.target.classList.add("active");
            const frameArr = document.getElementsByClassName("compare-result");
            if(frameArr.length > 0) {
                Array.from(frameArr).forEach(element => {
                    element.classList.add("none");
                });
            }
        }
    }
    //const selectSize = (sizeName) => {changeActiveSize(sizeName);}
    return (
        <section className="View-Compare">
            <header>
                <div className="title-wrapper">
                    <p className="sname">{productData.info.sname}</p>
                    <h1 className="pname">{productData.info.pname}</h1>
                    <div>
                        <a className="praw" href={`http://${productData.praw.full}`}>{productData.praw.full}</a>
                    </div>
                </div>
                <div className="size-wrapper">
                    <HeaderSizeList 
                        sizeData={productData.info.size}
                        activeSize={activeSize}
                        selectSize={setActiveSize}/>
                </div>
            </header>
            <article>
                <div className="standard-wrapper">
                    <div className="standard-frame">
                        <p>나의 옷</p>
                        <div className="standard-colorBar"></div>
                    </div>
                    <button onClick={(e) => viewTypeEvent(e)}>
                        <i className="material-icons">assessment</i>
                    </button>
                </div>
                <div className="compare-wrapper">
                    <CompareGraphList
                        activeSize={activeSize}
                        myProductData={myProduct ? myProduct.size : null}
                        productSizeData={productData.info.size} />
                </div>
            </article>
        </section>
    );
}

Compare.proptype = {
    productData : Proptype.object.isRequired,
    myProduct : Proptype.object
}

export default React.memo(Compare);



/*{
    status : 200,
    praw : {
        http : "www.mazia.kr/shop/shopdetail.html?branduid=27580",
        type : "branduid",
        code : "27580",
        full : "www.mazia.kr/shop/shopdetail.html?branduid=27580"
    },
    info : {
        sname : "Mazia look",
        pname : "보스턴 핸드메이드 코트",
        ptype : "아우터",
        subtype : "코트",
        size : [
            {
                name: "Free",
                waist : 58,
                sleeve : 72,
                arm : 34.5,
                length : 117,
                bot: 77 // the bottom of a top
            }
        ]
    }
}*/


/*      header - Size list       */
const HeaderSizeList = ({ sizeData, selectSize }) => {
    const sizeElementList = useRef(null);
    const elementChangeEvent = (e) => {
        if(e === null) return;
        const parent = e.target.parentElement.parentElement;
        if(!parent.classList.contains("on")) {
            if(document.querySelector("li.size-element.on") !== null) document.querySelector("li.size-element.on").classList.remove("on");
            parent.classList.add("on");
            selectSize(e.target.value);
        }
    }
    const sizeElementClickEvent = (e,size) => {
        e.stopPropagation();
        let target = e.target;
        if(target.classList.contains("size-element")) target = target.querySelector("p");

        const tl = target.classList;
        if(tl.contains("active")) {
            tl.remove("active");
            selectSize(null);
        } else {
            if(sizeElementList.current.querySelector(".active")) {
                sizeElementList.current.querySelector(".active").classList.remove("active");
            }
            tl.add("active");
            selectSize(size);
        }
    }
    return (
        <ul ref={sizeElementList}>
            {
                sizeData.map((size, index) => (
                    <li className="size-element" key={index} onClick={(e) => {sizeElementClickEvent(e, size.name)}}>
                        <p>{size.name}</p>
                        <input type="radio" name="select-size" value={size.name} onChange={(e) => elementChangeEvent(e)}/>
                    </li>
                ))
            }
        </ul>
    );
}
HeaderSizeList.proptype = {
    sizeData : Proptype.array.isRequired,
    activeSize : Proptype.string.isRequired,
    selectSize : Proptype.func.isRequired // 어떤 사이즈를 선택했는지를 부모 컴포넌트에 리턴함
}