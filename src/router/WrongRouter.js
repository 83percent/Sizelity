// Style
import '../contents/css/ErrorRouter.css';
const WrongRouter = ({history}) => {
    return (
        <section id="Error">
            <div className="title-frame">
                <h1>Error</h1>
                <h3>잘못된 접근입니다.</h3>
            </div>
            <div className="trigger-frame">
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </div>
        </section>
    );
}

export default WrongRouter;
