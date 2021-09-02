// CSS
import '../../contents/css/Help/HelpMain.css';

const HelpMain = ({history}) => {
    
    return (
        <section id="Help">
            <header>
                <h1>고객센터</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
        </section>
    );
}
export default HelpMain;