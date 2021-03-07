// Style
import { Link } from 'react-router-dom';
import '../contents/css/ErrorRouter.css';
const NotFoundRouter = () => {
    return (
        <section id="Error">
            <div className="title-frame">
                <h1>404</h1>
                <h3>NotFound</h3>
            </div>
            <div className="trigger-frame">
                <Link to="/">
                    <i className="material-icons">arrow_back</i>
                </Link>
                
            </div>
        </section>
    );
}

export default NotFoundRouter;