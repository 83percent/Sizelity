
// CSS
import '../../contents/css/Setting/Setting.css';


import { Link } from 'react-router-dom';

const SettingList = ({history}) => {


    return (
        <section id="list-wrapper">
            <header>
                <h1>설정</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <main className="list-frame">
                <div>
                    <ul>
                        <li>
                            <Link to="/setting/notice">
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
                            <Link to="/setting/user">
                                <i className="material-icons">face</i>
                                <p>내 정보 관리</p>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
                <div className="menu-wrapper">
                    <h2>지원</h2>
                    <ul>
                        <li>
                            <Link to="/help">
                                <i className="material-icons">help_outline</i>
                                <p>고객센터</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting/improvement">
                                <i className="material-icons">history_edu</i>
                                <p>개선사항</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting/service">
                                <i className="material-icons">business</i>
                                <p>서비스 정보</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        </section>
    )
}
export default SettingList;