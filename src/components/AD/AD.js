import { useContext, useEffect, useRef, useState } from "react";
import PopupModule from '../../contents/js/ad/ADPopup';

// Context
import { ServerContext, ADContext } from "../../App";

// CSS
import '../../contents/css/AD/Popup.css';


const AD = () => {
    // State
    const [popup, setPopup] = useState(undefined);

    // Ref
    const popupRef = useRef(null);

    // Context
    const server = useContext(ServerContext);
    const {ADCheck, setADCheck} = useContext(ADContext);

    function close(e) {
        e.stopPropagation();
        if(!popupRef.current) return;
        popupRef.current.classList.remove("on");
        popupRef.current.querySelector("div").classList.add("on");
    }

    useEffect(() => {
        if(popup === undefined && ADCheck % 4 === 0 && !Math.floor(Math.random() * 2)) {
            (async () => {
                const response = await new PopupModule(server).getPopup();
                if(response?.type === 'success') {
                    setPopup(response.data);
                    popupRef.current.classList.add("on");
                    setTimeout(() => {
                        popupRef.current.querySelector("div").classList.add("on");
                    }, 100)
                }
                else setPopup(null);
            })();
        }
        setADCheck(ADCheck+1);
    }, [popup, server]);

    useEffect(() => {
        if(!popup) {
            
        }
    }, [popup])

    if(popup) {
        return (
            <article id="popup" ref={popupRef}>
                <aside onClick={(e) => close(e)}></aside>
                <div>
                    <i className="material-icons" onClick={(e) => close(e)}>close</i>
                    <a href={popup.url} className="image">
                        <img src={popup.image} alt="ad" />
                    </a>
                </div>
            </article>
        )
    } else return null;
}

export default AD;