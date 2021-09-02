import React, { useRef, useState } from 'react';
import Proptype from 'prop-types';
import ProductTypeModule from '../../contents/js/ProductType';

// CSS
import '../../contents/css/Compare/Compare_Article.css';

// Component
import CompareGraphList from "./Compare_Graph";

const Compare = ({productData, myProduct, navToggle}) => {

    // data에 온전하지 못한 정보가 담겨 올 것을 대비해 데이터 검증.js 를 만들어 
    // 검증 후 지금의 Component를 화면에 출력 / 그렇지 못한 경우 데이터가 없다는 페이지로 이동
    const [activeSize, setActiveSize] = useState(null);

    // Ref
    const compareGraphRef = useRef(null);

    const viewTypeEvent = (target) => {
        // 그래프만 보기
        if(target.classList.contains("active")) {
            // 활성화 상태 : 그래프만 보임
            target.classList.remove("active");
            compareGraphRef.current.classList.remove("only-graph");
        } else {
            // 비활성화 상태 : 결과도 같이 보임 -> 그래프만 보이게 display:none
            target.classList.add("active");
            compareGraphRef.current.classList.add("only-graph");
        }
    }
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
                    <SizeList 
                        sizeData={productData.size}
                        activeSize={activeSize}
                        selectSize={setActiveSize}/>
                </div>
                    
            </header>
            <article>
                <section className="type-compare">
                    <div>
                        <p>보고있는 상품</p>
                        <div>
                            <p>{ProductTypeModule.getTypeName(productData.info.ptype)}</p>
                            <p>/</p>
                            <p>{productData.info?.subtype}</p>
                        </div>
                    </div>
                    <div>
                        {
                            myProduct ? (
                                <>
                                    <p>나의 옷</p>
                                    <div>
                                        <p>{ProductTypeModule.getTypeName(myProduct.info.ptype)}</p>
                                        <p>/</p>
                                        <p>{myProduct.info?.subtype}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="none">
                                    <p>비교할 나의 옷을 선택해주세요.</p>
                                </div>
                            )
                        }
                    </div>
                </section>
            
                <div className="standard-wrapper">
                    
                    <div className="standard-frame">
                        <p>나의 옷</p>
                        <div className="standard-colorBar"></div>
                    </div>
                    <button onClick={(e) => viewTypeEvent(e.target)}>
                        <i className="material-icons">assessment</i>
                    </button>
                </div>
                <div className="compare-wrapper" ref={compareGraphRef}>
                    <CompareGraphList
                        activeSize={activeSize}
                        myProductData={myProduct ? myProduct.size : null}
                        productSizeData={productData.size} />
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
const SizeList = ({ sizeData, selectSize }) => {
    const sizeElementList = useRef(null);

    const sizeElementClickEvent = (target,size) => {
        if(target.classList.contains("size-element")) target = target.querySelector("p");

        const tl = target.classList;
        if(tl.contains("active")) {
            tl.remove("active");
            sizeElementList.current.nextElementSibling.checked = false;
            selectSize(null);
        } else {
            if(sizeElementList.current !== null) {
                sizeElementList.current.classList.remove("active");
            }
            target.nextElementSibling.checked = true;
            sizeElementList.current = target;
            tl.add("active");
            selectSize(size);
        }
    }
    return (
        <ul>
            {
                sizeData.map((size, index) => (
                    <li className="size-element" key={index} >
                        <p onClick={(e) => {sizeElementClickEvent(e.target, size.name)}}>{size.name}</p>
                        <input type="radio" name="select-size" value={size.name}/>
                    </li>
                ))
            }
        </ul>
    );
}
SizeList.proptype = {
    sizeData : Proptype.array.isRequired,
    selectSize : Proptype.func.isRequired // 어떤 사이즈를 선택했는지를 부모 컴포넌트에 리턴함
}