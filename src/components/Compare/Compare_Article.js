import React, { useCallback, useRef, useState } from 'react';
import ProductTypeModule from '../../contents/js/ProductType';


// CSS
import '../../contents/css/Compare/Compare_Article.css';

// Component
import CompareGraphList from "./Compare_Graph";
import SizeHelp from '../Nav/SizeHelp';

const Compare = ({productData, myProduct, CompareCount}) => {
    // data에 온전하지 못한 정보가 담겨 올 것을 대비해 데이터 검증.js 를 만들어 
    // 검증 후 지금의 Component를 화면에 출력 / 그렇지 못한 경우 데이터가 없다는 페이지로 이동
    
    const [activeSize, setActiveSize] = useState(null);
    const [onSizeHelp, setOnSizeHelp] = useState(false);

    // useCallBack
    const compareCounting = useCallback(() => {
        const compareDomain = productData?.praw?.domain;
        const provideDomain = myProduct?.praw?.domain;

        if(compareDomain) {
            // 같은 쇼핑몰일 경우 카운팅 X
            if(compareDomain !== provideDomain) CompareCount.done({compareDomain, provideDomain});
        }
    }, [productData, myProduct, CompareCount])

    // Ref
    const compareGraphRef = useRef(null);

    function viewTypeEvent (target) {
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
    function viewSizeHelp(target) {
        // 의류별 사이즈 측정 위치 이미지 보기
        if(target.classList.contains("active")) {
            target.classList.remove("active");
            setOnSizeHelp(false);
        } else {
            
            target.classList.add("active");
            setOnSizeHelp(true);
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
                    <button onClick={e => viewSizeHelp(e.target)}>
                        <i className="material-icons">help_outline</i>
                    </button>
                    <button onClick={(e) => viewTypeEvent(e.target)}>
                        <i className="material-icons">assessment</i>
                    </button>
                </div>
                <SizeHelp
                    ptype={productData?.info?.ptype}
                    on={onSizeHelp}/>
                <div className="compare-wrapper" ref={compareGraphRef}>
                    <CompareGraphList
                        activeSize={activeSize}
                        myProductData={myProduct ? myProduct.size : null}
                        productSizeData={productData.size}
                        compareCounting={compareCounting}/>
                </div>
            </article>
        </section>
    );
}

export default React.memo(Compare);


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
