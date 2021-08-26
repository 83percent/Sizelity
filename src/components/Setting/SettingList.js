import { useContext } from 'react';
import AccountModule from '../../contents/js/Account';
import { useCookies } from 'react-cookie';

// CSS
import '../../contents/css/Setting/Setting.css';

// Context
import { LoginContext, ServerContext } from '../../App';
import { Link } from 'react-router-dom';

const SettingList = ({history}) => {
    // Cookie
    const cookies = useCookies(['sizelity_token']);

    // Context
    const {userInfo ,setUserInfo} = useContext(LoginContext);
    const server = useContext(ServerContext);

    if(!userInfo)  {
        history.replace("/notlogin");
        return null;
    }

    const event = {
        logout : () => {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                try {
                    cookies[2]('sizelity_token');
                    new AccountModule(server).logout();
                    history.replace("/");
                    setUserInfo(null);
                } catch {
                    return;
                }
                
            }
            return null;
        },
    }

    return (
        <section className="setting-list">
            <header>
                <h1>설정</h1>
                <i className="material-icons back" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <main>
                <div>
                    <ul>
                        <li>
                            <Link>
                                <i className="material-icons-outlined">campaign</i>
                                <p>공지사항</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>개인</h2>
                    <ul>
                        <li>
                            <Link to="/setting/chinfo" className="menu-element">
                                <i className="material-icons">person</i>
                                <p>내정보 관리</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting/chinfo" className="menu-element">
                                <i className="material-icons">storage</i>
                                <p>저장된 정보</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-wrapper">
                    <h2>지원</h2>
                    <ul>
                        <li>
                            <Link to="/help" className="menu-element">
                                <i className="material-icons">help</i>
                                <p>고객센터</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        </section>
    )
}
export default SettingList;