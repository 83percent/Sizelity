// Module
import { Link } from 'react-router-dom';

// CSS
import '../../contents/css/View/View_Main.css';

// Component

const Main = () => {
    return (
        <section id="Main">
            <div id="search-wrapper">
                <h1 id="title">상품의 주소를 입력해주세요</h1>
                <Link to="/view/search" id="search-input-wrapper">
                    <div id="search-input-frame">
                        <p>상품의 주소를 입력해주세요.</p>
                    </div>
                </Link>
            </div>
        </section>
    );
}

export default Main;