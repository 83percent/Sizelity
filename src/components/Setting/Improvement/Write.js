import { useContext } from "react";

// Context
import { ServerContext } from "../../../App";


const Write = ({history}) => {
    const server = useContext(ServerContext);
    
    return (
        <section id="list-wrapper">
            <header>
                <h1>개선사항</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <article className="write-frame">
                <input type="text" placeholder="제목"/>
                <textarea placeholder="개선사항을 알려주세요. 300자 이하."></textarea>
                <div>
                    <button style={{maxWidth: "93%"}}>전송</button>
                </div>
            </article>
        </section>
    )
}

export default Write;