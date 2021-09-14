// CSS
import '../../contents/css/Compare/Compare_Menu.css';

// Context 
import { Link } from "react-router-dom";

const Menu = ({closerEvent}) => {
    return (
        <>
            <div className="menu-closer" onClick={() => closerEvent()}></div>
            <div className="menu-frame">
                <div onClick={() => closerEvent()}>
                    <i className="material-icons">close</i>
                </div>
                <header>
                    <ul>
                        <li><Link to="/closet">나의 옷장</Link></li>
                        <li><Link to="/after">나중에 볼 상품</Link></li>
                    </ul>
                </header>
                <article>
                    <ul>
                        <li>
                            <Link to='/event'><h2>혜택 모아보기</h2></Link>
                        </li>
                    </ul>
                </article>
                <footer>
                    <ul>
                        <li>
                            <Link to="/setting">설정</Link>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    )
}

export default Menu;
