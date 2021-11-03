import axios from "axios";
import { useContext, useRef } from "react";

// Context
import { ServerContext } from "../../../App";


const Write = ({history}) => {
    // Context
    const server = useContext(ServerContext);
    
    // ref
    const _title = useRef(null);
    const _content = useRef(null);

    async function send() {
        if(_title.current.value.length === 0) {
            window.alert("제목을 입력해주세요.");
            return;
        } else if(_title.current.value.length > 40) {
            window.alert("제목이 너무 길어요. (40자 이하)");
            return;
        }

        if(_content.current.value.length === 0) {
            window.alert("내용을 입력해주세요.");
            return;
        } else if(_title.current.value.length > 300) {
            window.alert("내용이 너무 길어요. (300자 이하)");
            return;
        }
        await axios({
            url: `${server}/improvement`,
            method: "POST",
            data : {
                title : _title.current.value,
                content : _content.current.value
            },
            withCredentials: true,
            timeout: 5500
        }).then(response => {
            if(response.status === 200) {
                window.alert("감사합니다.\n개선사항의 내용이 사이즈리티에 전달되었어요.");
                history.goBack();
            }
        }).catch(err => {
            window.alert("문제가 발생했습니다.\n잠시 후 다시 시도해주세요.");
        })
    }

    return (
        <section id="list-wrapper">
            <header>
                <h1>개선사항</h1>
                <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
            </header>
            <article className="write-frame">
                <input type="text" placeholder="제목" ref={_title} maxLength="40"/>
                <textarea placeholder="개선사항을 알려주세요. 300자 이하." maxLength="300" ref={_content}></textarea>
                <div>
                    <button style={{maxWidth: "93%"}} onClick={() => send()}>전송</button>
                </div>
            </article>
        </section>
    )
}

export default Write;