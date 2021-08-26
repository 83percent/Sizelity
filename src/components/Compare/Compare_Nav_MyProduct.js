import React, {useContext} from 'react';
import Transition from '../../contents/js/TransitionSizeName';

// CSS
import '../../contents/css/MyProductNav.css';

// Context
import { MediaContext } from '../../App';

/*
    @param myProductData : 현재 나의 옷 정보가 담긴 Object (in Cookie "my_recently")
    @param setMyProductData : 현재 나의 옷 정보가 담긴 Object state 를 변경하는 함수
*/
let transition = null;
const NavMyProduct = ({myProductData, history, nav, navToggle}) => {
    // Context
    const media = useContext(MediaContext);
    
    if(!transition) transition = new Transition("KOR");

    const event = {
        moveCloset : function() {
            if(nav.current.classList.contains("active")) {
                history.push({
                    pathname : "/closet",
                    state : {
                        isCompare : true
                    }
                });
            }
        }
    } // event
    return (
        <>
            {
                media === "Phone" ?
                <div className="navCloser"  onTouchStart={() => navToggle()}></div> : 
                <div className="navCloser"  onClick={() => navToggle()}></div> 
            }
            <nav className="myProductNav" onClick={() => navToggle(true)}>
            {
                myProductData ? (
                    <>
                        <div className="size">
                            <p>{myProductData.size.name}</p>
                        </div>
                        <div className="info">
                            <p>{myProductData.info.sname ? myProductData.info.sname : null}</p>
                            <h1>{myProductData.info.nick ? myProductData.info.nick : myProductData.info.pname ? myProductData.info.pname : null}</h1>
                            <div>
                                <p>{transition.getCate(myProductData.info.ptype)}</p>
                                <b>/</b>
                                <p>{myProductData.info.subtype ? myProductData.info.subtype : null}</p>
                            </div>
                        </div>
                        <div className="changeBtn">
                            <i className='material-icons' onClick={() => event.moveCloset(true)}>swap_horiz</i>
                        </div>
                    </>
                ) : (
                    
                        <button onClick={() => event.moveCloset(false)}>
                            <i className="material-icons">add</i>
                            <p>나의 옷을 골라주세요.</p>
                        </button>
                )
            }
            </nav>
        </>
    )
}

export default React.memo(NavMyProduct);