import axios from 'axios';
import { set } from 'lodash';
import { useEffect, useRef, useState } from 'react';

// CSS
import '../../contents/css/Event/Event_List.css';


const EventList = ({history}) => {
    // state
    const [list, setList] = useState(undefined);
    
    // ref
    const caution = useRef(null);

    const getDay = (start, end) => Math.floor((new Date(start).getTime() - new Date(end).getTime()) / (1000 * 60 * 60 * 24)) * -1;

    if(list) console.log(list);

    const event = {
        cautionToggle : (force) => {
            if(!caution.current) return;
            if(force === undefined) force = !caution.current.classList.contains("on");
            caution.current.classList.toggle("on",force);
        }
    }

    useEffect(() => {
        const fetch = async() => {
            const response = await axios({
                method: "post",
                url : "http://localhost:3001/event/get",
                data : {
                    cate : "all"
                },
                timeout : 3500
            }).catch(err => {
                console.log("Evnet Get Timeout : ", err);
                event.cautionToggle(true);
                return {data:{status:-200}}
            });
            if(response.data.status) {
                console.log("Error : ", response.data.status);
                setList(null);
            } else {
                setList(response.data);
            }
        }
        fetch();
    }, []);
    return (
        <section id="List">
            <div className="caution-wrapper" ref={caution}>
                <div className="caution-frame">
                    <p>잠시 후 시도해주세요.</p>
                </div>
                <div className="caution-closer" onClick={() => event.cautionToggle(false)}></div>
            </div>
            <div>
                <button onClick={() => history.goBack()}>
                    <i className="material-icons">arrow_back</i>
                </button>
            </div>
            <header>
                <div>
                    <h1>이벤트</h1>
                    <p></p>
                </div>
            </header>
            <article>
                {
                    (list && list.slizelity && list.sizelity.length > 0) ? (
                        <div className="list-wrapper">
                            <div className="title-frame">
                                <h1>진행중인 이벤트</h1>
                            </div>
                        </div>
                    ) : null
                }
                <div className="list-wrapper">
                    <div className="title-frame">
                        <h1>프로모션</h1>
                    </div>
                    {
                        (list && list.shop && list.shop.length > 0) ? (
                            <ul> {
                                list.shop.map((element, index) => (
                                    <li key={index}>
                                        <a href={element.link}>
                                            <div className="list-title">
                                                <h1>{element.sname}</h1>
                                                <div className="list-d">
                                                    <h2>{getDay(element.expires.start, element.expires.end)}</h2>
                                                    <p>일 남음</p>
                                                </div>

                                            </div>
                                            <div className="list-img">

                                            </div>
                                            <div className="list-tag-frame">
                                                {element.tag.map((tagName, index) => (
                                                    <p key={index}>#{tagName}</p>
                                                ))}
                                            </div>
                                        </a>
                                    </li>
                                ))
                            }</ul>
                        ) : list === null ? (
                            <div className="list-none">
                                <i className="material-icons">sentiment_very_dissatisfied</i>
                                <p>진행중인 프로모션이 없습니다.</p>
                            </div>
                        ) : (
                            <div className="list-none">
                                <div className="loader"></div>
                            </div>
                        )
                    }
                </div>
            </article>
            <footer>

            </footer>
        </section>
    )
}
export default EventList;