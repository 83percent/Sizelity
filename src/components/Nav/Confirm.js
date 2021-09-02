import { useContext } from 'react';
import { MediaContext } from '../../App';

import '../../contents/css/Nav/Confirm.css';

const Confirm = ({
    cate,
    title,

    passText,
    passColor,
    passAction,

    cancelText,
    cancelColor,
    cancelAction,
}) => {


    // Context
    const media = useContext(MediaContext);
    
    return (
        <>
        {/* <article className="confirm"> */}
            <article>
                <div className="title">
                    <h4>{cate}</h4>
                    <p>{title}</p>
                </div>
                <div className="btn-wrapper">
                    <button style={{borderRight:"1px solid #dbdbdb"}} onClick={() => cancelAction()}>
                        <p style={{color : `${cancelColor}`}}>{cancelText}</p>
                    </button>
                    <button onClick={() => passAction()}>
                        <p style={{color : `${passColor}`}}>{passText}</p>
                    </button>
                </div>
            </article>
            {
                (media === "Phone") ?  
                (<aside onTouchStart={() => cancelAction()}></aside>) :
                (<aside onClick={() => cancelAction()}></aside>)
            }
        {/* </article> */}
        </>
    )
}

export default Confirm