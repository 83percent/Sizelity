import React, { useState } from 'react';
import Proptype from 'prop-types';

// CSS
import '../../contents/css/View/View_Compare.css';

// Component
import CompareGraphList from "./View_Compare_List";

const Compare = ({productData}) => {
    // data에 온전하지 못한 정보가 담겨 올 것을 대비해 데이터 검증.js 를 만들어 
    // 검증 후 지금의 Component를 화면에 출력 / 그렇지 못한 경우 데이터가 없다는 페이지로 이동
    const [activeSize, setActiveSize] = useState(null);
    const [data, setData] = useState(productData); // 어떠한 데이터가 들어왔는지에 대한 State
    const [myProduct, setMyProduct] = useState(MyProduct); // 임시적용 : 사용자의 상품 데이터

    const viewTypeEvent = (e) => {
        // 그래프만 보기
        console.log("click");
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
                    <p className="sname">{data.info.sname}</p>
                    <h1 className="pname">{data.info.pname}</h1>
                    <div>
                        <a className="praw" href={`http://${data.praw.full}`}>{data.praw.full}</a>
                    </div>
                </div>
                <div className="size-wrapper">
                    <HeaderSizeList 
                        sizeData={data.info.size}
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
                        myProductData={myProduct.size}
                        productSizeData={data.info.size} />
                </div>
            </article>
        </section>
    );
}

Compare.proptype = {
    data : Proptype.object.isRequired
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
    const elementChangeEvent = (e) => {
        if(e === null) return;
        const parent = e.target.parentElement.parentElement;
        if(!parent.classList.contains("on")) {
            if(document.querySelector("li.size-element.on") !== null) document.querySelector("li.size-element.on").classList.remove("on");
            parent.classList.add("on");
            selectSize(e.target.value);
        }
    }
    return (
        <ul>
            {
                sizeData.map((size, index) => (
                    <li className="size-element" key={index}>
                        <label>
                            <p>{size.name}</p>
                            <input type="radio" name="select-size" value={size.name} onChange={(e) => elementChangeEvent(e)}/>
                        </label>
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

/* My Product Sample Data */
const MyProduct = {
    praw : {
        type : "product",
        code : "39573",
        full : "mr-s.co.kr/product/%EB%8D%94%ED%8B%B0-%EC%99%80%EC%9D%B4%EB%93%9C-%EB%8D%B0%EB%8B%98-%ED%8C%AC%EC%B8%A0/39573"
    },
    info : {
        sname : "미스터 스트릿",
        pname : "더티 와이드 데님 팬츠",
        ptype : "하의",
        subtype : "긴바지",
        nick : "어두운 와이드 청바지"
    },
    size : {
        name: "L",
        T_length : 102,
        waist : 41,
        crotch : 34,
        thigh : 34,
        hem : 24
    }
    
}