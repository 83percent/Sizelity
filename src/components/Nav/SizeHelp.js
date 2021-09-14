import { supportCate } from '../../contents/js/ProductType';

// CSS
import '../../contents/css/Nav/SizeHelp.css';

const SizeHelp = ({ptype, on}) => {
    if(!ptype || !supportCate.includes(ptype)) return null;
    else {
        switch(ptype) {
            case 'outer' : break;
            case 'top' : break;
            case 'bottom' : break;
            case 'onepiece' : break;
            case 'suit' : break;
            case 'skirt' : break;
            case 'unknown' :
            case 'shoes' :
            case 'set' : 
            default : return null;
        }
        return (
            <article id="sizeHelp" className={on ? 'active' : null}>
                <div className="title">
                    <div className="dot"></div>
                    <h2>사이즈 측정 방법</h2>
                </div>
                <div className="image">
                    <img src={`/images/${ptype}.png`} alt={ptype} title={ptype}/>
                </div>
            </article>
        )
    }
}

export default SizeHelp;