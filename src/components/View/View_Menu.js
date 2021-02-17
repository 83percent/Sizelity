import React, { useContext } from "react";
import Proptype from 'prop-types';

// CSS
import '../../contents/css/View/View_Menu.css';

// Context 
import LoginContext from '../../App';


const Menu = () => {
    const userInfo = useContext(LoginContext);
    return (
        <>
            <div className="Menu-wrapper">
                <div className="Menu-loginFrame">
                    <i className="material-icons">lock</i>
                    <p>로그인 정보가 없습니다.</p>
                </div>
            </div>
        </>
    )
}

Menu.Proptype = {

}
export default Menu;
