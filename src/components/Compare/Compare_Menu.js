import React, { useContext } from "react";

// CSS
import '../../contents/css/Compare/Compare_Menu.css';

// Context 
import {LoginContext}from '../../App';
import { Link } from "react-router-dom";


const Menu = ({closerEvent}) => {
    const {userInfo} = useContext(LoginContext);
    
    return (
        <>
            <div className="menu-closer" onClick={() => closerEvent(false)}></div>
            <div className="menu-frame">
                <div onClick={() => closerEvent(false)}>
                    <p>닫기</p>
                    <i className="material-icons">keyboard_arrow_right</i>
                </div>
                <header>
                    {
                        (userInfo && userInfo._id) ? (
                            <ul>
                                <li><Link to="/closet">나의 상품</Link></li>
                                <li><Link to="/after">나중에 볼 상품</Link></li>
                                
                            </ul>
                        ) : (
                            <ul>
                                <li><Link to="/login">로그인</Link></li>
                                <p></p>
                            </ul>
                        )
                    }
                </header>
                <article>
                    <ul>
                        <li>
                            <Link to='/event'><h2>이벤트</h2></Link>
                        </li>
                    </ul>
                </article>
                <footer>
                    <ul>
                        <li>
                            <h1>고객센터</h1>
                        </li>
                        {
                            (userInfo && userInfo._id) ? (
                                <li>
                                    <Link to="/setting">설정</Link>
                                </li>
                            ) : null
                        }
                    </ul>
                </footer>
            </div>
        </>
    )
}

export default Menu;
