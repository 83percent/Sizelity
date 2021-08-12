import { useContext } from 'react';
import AccountModule from '../../contents/js/Account';
// CSS
import '../../contents/css/Setting/Setting.css';

// Context
import { LoginContext, ServerContext } from '../../App';
import { Link } from 'react-router-dom';

const UserMenu = ({history}) => {



    const {userInfo ,setUserInfo} = useContext(LoginContext);
    const server = useContext(ServerContext);
    if(!userInfo)  {
        history.replace("/notlogin");
        return null;
    }

    const event = {
        logout : async () => {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                await new AccountModule(server).logout();
                history.replace("/");
                setUserInfo(null);
            }
            return null;
        },
    }

    return (
        <section id="Setting">
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
                        <Link to="/setting/chinfo" className="menu-element">
                            <i className="material-icons">mode_edit</i>
                            <p>개인정보 수정</p>
                        </Link>
                        <Link to="/setting/chpwd" className="menu-element">
                            <i className="material-icons">vpn_key</i>
                            <p>비밀번호 변경</p>
                        </Link>
                    </ul>
                </div>
                <div className="menu-wrapper">
                    <div className="menu-wrapper-title">
                        <h1>고객센터</h1>
                    </div>
                    <ul>
                        <Link to="/help" className="menu-element">
                            <i className="material-icons">help</i>
                            <p>고객센터</p>
                        </Link>
                    </ul>
                </div>
                <div className="menu-wrapper">
                    <div className="menu-wrapper-title">
                        <h1>로그인</h1>
                    </div>
                    <ul>
                        <li className="menu-element" onClick={() => event.logout()}>
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