import React, {useContext, useState} from 'react';
import { getTypeName, getSizeRate } from '../../contents/js/ProductType';

// CSS
import '../../contents/css/Nav//MyProductNav.css';

// SVG
import {ReactComponent as Female} from '../../contents/asset/female_24dp.svg';

// Context
import { LoginContext, MediaContext } from '../../App';

/*
    @param myProductData : 현재 나의 옷 정보가 담긴 Object (in Cookie "my_recently")
    @param setMyProductData : 현재 나의 옷 정보가 담긴 Object state 를 변경하는 함수
*/
const NavMyProduct = ({myProductData, history, wrapper=undefined, navToggle=undefined}) => {

    // State
    const [detailOpen, setDetailOpen] = useState(false);


    // Context
    const media = useContext(MediaContext);
    const {userInfo} = useContext(LoginContext);
    
    function toggleDetailOpen(force) {
        if(!myProductData) return;
        if(force !== undefined) {
            setDetailOpen(force);
        } else {
            setDetailOpen(!detailOpen); 
        }
    }

    if(navToggle) {
        function moveCloset() {
            if(wrapper.current) wrapper = wrapper.current;
            if(wrapper.classList.contains("active")) {
                history.push({
                    pathname : "/closet",
                    state : {
                        isCompare : true
                    }
                });
            }
        }
        return (
            <>
                {
                    detailOpen ? (
                        <Detail
                            data={myProductData}
                            toggleDetailOpen={toggleDetailOpen}
                            history={history}/>
                    ) : (
                        media === "Phone" ?
                        <aside onTouchStart={() => navToggle(false)}></aside> : 
                        <aside onClick={() => navToggle(false)}></aside> 
                    )
                }
                <nav className="myProductNav">
                    <MyProductNav
                        data={myProductData}
                        history={history} moveCloset={moveCloset}
                        gender={userInfo?.gender}
                        navToggle={navToggle}
                        toggleDetailOpen={toggleDetailOpen}/>
                </nav>
            </>
        )
    } else {
        return (
            <>
                {
                    detailOpen ? (
                        <Detail
                            data={myProductData}
                            toggleDetailOpen={toggleDetailOpen}
                            history={history}/>
                    ) : null
                }
                <nav className="myProductNav">
                    <MyProductNav
                        data={myProductData}
                        history={history}
                        gender={userInfo?.gender}
                        navToggle={navToggle}
                        toggleDetailOpen={toggleDetailOpen}/>
                </nav>
            </>
        )
    }
    
}
const MyProductNav = ({data, history, gender="male" ,moveCloset=undefined, navToggle=undefined, toggleDetailOpen}) => {
    return (
        <>
            <div className="product-wrapper">
                {
                    data ? ( () => {
                        const {
                            info : {sname, nick, pname, ptype, subtype},
                            size : {name}
                        } = data;
                        return (
                            <>
                                <div className="size">
                                    <p>{name}</p>
                                </div>
                                <div className="info">
                                    <p>{sname ? sname : null}</p>
                                    <h1>{nick ? nick : pname ? pname : null}</h1>
                                    <div>
                                        <p>{getTypeName(ptype)}</p>
                                        {
                                            subtype ? (
                                                <>
                                                    <b>/</b>
                                                    <p>{subtype}</p>
                                                </>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    })() : (
                        <h2 className="none">비교할 나의 옷을 선택해주세요</h2>
                    )
                }
            </div>
            <div className="btn-wrapper">
                <button onClick={() => toggleDetailOpen()}>
                    상세보기
                </button>
                {
                    moveCloset ? (
                        <button onClick={() => moveCloset()}>
                            나의 옷 변경
                        </button>
                    ) : (
                        <button onClick={() => history.goBack()}>
                            비교하기
                        </button>
                    )
                }
                
            </div>
            {
                navToggle ? (
                    <div className="open-btn"  onClick={() => navToggle(true)}>
                        {
                           gender === 'female' ? (
                                <Female width="3.2rem" height="3.2rem" fill="#ffffff"/>
                            ) : (
                                <i className='material-icons'>face</i>
                            )
                        }
                    </div>
                ) : null
            }
        </>
    )
}

const Detail = ({data, toggleDetailOpen, history}) => {
    if(!data) return null;
    else {

        const {info, praw, size} = data;
        function toggleExpand(target) {
            for(let i = 0; i < 4; ++i) {
                if(target.nodeName === "SECTION") {
                    target.classList.toggle("on");
                    break;
                } else target = target.parentElement;
            }
        }
        function goEdit() {
            history.push({
                pathname: '/closet/create',
                state: {
                    data,
                    mode : "modifyFromDetail"
                }
            });
        }

        const sizeRateArrays = getSizeRate(info?.ptype);

        return (
            <article id="detail">
                <div className="title">
                    <h1>현재 나의 옷</h1>
                    <i className="material-icons" onClick={() => toggleDetailOpen(false)}>close</i>
                </div>
                <section>
                    <p>기본정보</p>
                    <div>
                        <p>지정 명칭</p>
                        <h2>{info.nick ? info.nick : info.pname}</h2>
                    </div>
                    <div className="row">
                        <div>
                            <p>종류</p>
                            <h2>{getTypeName(info.ptype)}</h2>
                        </div>
                        {
                            info?.subtype ? (
                                <div>
                                    <p>세부 종류</p>
                                    <h2>{info.subtype}</h2>
                                </div>
                            ) : null
                        }
                    </div>
                </section>
                {
                    info?.sname ? (
                        <section  className="expand-wrapper">
                            <div className="title" onClick={(e) => toggleExpand(e.target)}>
                                <p>구매 쇼핑몰 정보</p>
                                <i className="material-icons">expand_more</i>
                            </div>
                            <div className="expand-frame">
                                <div>
                                    <p>쇼핑몰</p>
                                    <h2>{info.sname}</h2>
                                </div>
                                <div>
                                    <p>상품 명</p>
                                    <h2>{info.pname}</h2>
                                </div>
                                <div>
                                    <p>상품 주소</p>
                                    <h2>{praw.full}</h2>
                                </div>    
                            </div>
                        </section>
                    ) : null
                }
                <section style={{borderBottom: "none"}}>
                    <div className="title">
                        <p>사이즈 정보</p>
                        <p>(cm)</p>
                    </div>
                    
                    <ul>
                        <li>
                            <p>사이즈 명</p>
                            <h2>{size.name}</h2>
                        </li>
                    {
                        sizeRateArrays.map((element, index) => (
                            <li key={index}>
                                <p>{element[1]}</p>
                                <h2>{size[element[0]]}</h2>
                            </li>
                        ))
                    }
                    </ul>
                    
                </section>
                <section>
                    <div className="btn-frame">
                        <button onClick={() => goEdit()}>수정</button>
                    </div>
                </section>
            </article>
        )
    }
    
}

export default React.memo(NavMyProduct);