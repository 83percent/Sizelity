// Style
import { Link } from 'react-router-dom';
import '../contents/css/NotFound.css';
const NotFound = () => {
    return (
        <div id="NotFound-frame">
            <Link id="NotFound-title" to="/home">Sizelity.</Link>
            <div>
                <p>Not Found.</p>
            </div>
            <Link to="/home" id="NotFound-GoHome">
                <div>
                    <i className="material-icons">arrow_back</i>
                    <p>GO HOME</p>
                </div>
            </Link>
        </div>
    );
}

export default NotFound;