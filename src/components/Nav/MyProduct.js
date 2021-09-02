import React, {useContext} from 'react';
import Transition from '../../contents/js/TransitionSizeName';

// CSS
import '../../contents/css/MyProductNav.css';

// SVG
import {ReactComponent as Female} from '../../contents/asset/female_24dp.svg';

// Context
import { LoginContext, MediaContext } from '../../App';

/*
    @param myProductData : 현재 나의 옷 정보가 담긴 Object (in Cookie "my_recently")
    @param setMyProductData : 현재 나의 옷 정보가 담긴 Object state 를 변경하는 함수
*/
let transition = null;

const NavMyProduct = ({myProductData, history, wrapper=undefined, navToggle=undefined}) => {
    // Context
    const media = useContext(MediaContext);
    const {userInfo} = useContext(LoginContext);
    
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
                    media === "Phone" ?
                    <aside onTouchStart={() => navToggle(false)}></aside> : 
                    <aside onClick={() => navToggle(false)}></aside> 
                }
                <nav className="myProductNav">
                    <MyProductNav
                        data={myProductData}
                        history={history} moveCloset={moveCloset}
                        gender={userInfo?.gender}
                        navToggle={navToggle}/>
                </nav>
            </>
        )
    } else {
        return (
            <nav className="myProductNav">
                <MyProductNav
                    data={myProductData}
                    history={history}
                    gender={userInfo?.gender}
                    navToggle={navToggle}/>
            </nav>
        )
    }
    
}
const MyProductNav = ({data, history, gender="male" ,moveCloset=undefined, navToggle=undefined}) => {
    if(!transition) transition = new Transition("KOR");
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
                                        <p>{transition.getCate(ptype)}</p>
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
                <button>
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

export default React.memo(NavMyProduct);