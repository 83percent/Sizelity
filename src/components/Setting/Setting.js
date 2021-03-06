import { useContext } from 'react';
import LoginModule from '../../contents/js/Login';

// CSS
import '../../contents/css/View/View_User_Menu.css';

// Context
import {LoginContext} from '../../App';

let login = null;
const UserMenu = ({history}) => {
    const {userInfo ,setUserInfo} = useContext(LoginContext);
    if(!login) login = new LoginModule();
    if(!userInfo)  {
        history.replace("/wrong");
        return null;
    }

    const Event = {
        logout : () => {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                login.logout();
                setUserInfo(null);
                history.replace("/");
            }
            return null;
        },
    }

    return (
        <section id="UserMenu">
            <i className="material-icons back" onClick={() => history.goBack()}>arrow_back</i>
            <header>
                <h1>설정</h1>
            </header>
            <article>
                <div className="menu-wrapper">
                    <div className="menu-wrapper-title">
                        <h1>개인정보</h1>
                    </div>
                    <ul>
                        <li className="menu-element">
                            <i className="material-icons">mode_edit</i>
                            <p>개인정보 수정</p>
                        </li>
                        <li className="menu-element">
                            <i className="material-icons">vpn_key</i>
                            <p>비밀번호 변경</p>
                        </li>
                    </ul>
                </div>
                <div className="menu-wrapper">
                    <div className="menu-wrapper-title">
                        <h1>로그인</h1>
                    </div>
                    <ul>
                        <li className="menu-element" onClick={() => Event.logout()}>
                            <i className="material-icons">lock</i>
                            <p>로그아웃</p>
                        </li>
                    </ul>
                </div>
            </article>
        </section>
    )
}
export default UserMenu;