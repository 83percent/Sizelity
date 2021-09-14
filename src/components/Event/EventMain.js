import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { eventDay } from '../../contents/js/DateFormat';
import EventModule from '../../contents/js/ad/Event';

// CSS
import '../../contents/css/Event/Event_List.css';

// Context
import {ServerContext} from '../../App';

const EventMain = ({history}) => {
    // State
    const [_option, _setOption] = useState('all');
    const [_promotionArrays, _setPromotionArrays] = useState(null);
    const [_eventArrays, _setEventArrays] = useState([]);


    // Ref
    const optionFrameRef = useRef(null);

    // Context
    const server = useContext(ServerContext);

    // Memo
    const eventModule = useMemo(() => {
        return new EventModule(server);
    }, [server])

    const event = {
        optionSelect : function(option, target) {
            if(_option === option) return;
            if(optionFrameRef.current !== null) {
                optionFrameRef.current.classList.remove("active");
            }
            target.classList.add("active");
            optionFrameRef.current = target;
            _setOption(option);
        }, // optionSelect(option, target)
        eventToggle: function(target) {
            for(let i=0; i < 5; ++i) {
                if(target.nodeName === "LI") {
                    target.classList.toggle("on");
                    break;
                } else target = target.parentElement;
            }
        }
    }

    useEffect(() => {
        (async () => {
            const response_ad = await eventModule.getADEventList(_option);
            if(response_ad.type === 'success') _setPromotionArrays(response_ad.data);
            else _setPromotionArrays(null);

            const response_normal = await eventModule.getList(_option, 0);
            if(response_normal.type === 'success') _setEventArrays(response_normal.data);
            else _setEventArrays(null);
        })();
    }, [_option, eventModule]);
    return (
        <section id="Event">
            <header>
                <div className="title">
                    <h1>혜택 모아보기</h1>
                </div>
                <button onClick={() => history.goBack()}>
                    <i className="material-icons">arrow_back</i>
                </button>
            </header>
            <ul>
                <li onClick={(e) => event.optionSelect("all", e.target)} className="active" ref={optionFrameRef}>전체</li>
                {
                    eventModule.getCate().map((element,index) => (
                        <li key={index} onClick={(e) => event.optionSelect(element[0], e.target)}>{element[1]}</li>
                    ))
                }
            </ul>
            {
                _promotionArrays?.length > 0 ? (
                    <article className="promotion">
                        <div className="title">
                            <h2>프로모션</h2>
                        </div>
                        <ul>
                            {
                                _promotionArrays.map((element, index) => (
                                    <li key={index}>
                                        <a href={element.url}>
                                            <img src={element.image} alt={index} />
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                ) : null
            }
            <article className="list">
                <div className="title">
                    <h2>혜택</h2>
                </div>
                {
                    _eventArrays?.length > 0 ? (
                        <ul>
                            {
                                _eventArrays.map((element, index) => (
                                    <li key={index}>
                                        <div className="title" onClick={(e) => event.eventToggle(e.target)}>
                                            <div>
                                                <h3>{element?.shopRef?.sname}</h3>
                                                <EventType type={element.type} />
                                            </div>
                                            <p>{eventDay(element.date)}</p>
                                            <i className="material-icons">expand_more</i>
                                        </div>
                                        <div className="more">
                                            <h4>{element.name}</h4>
                                            <div className="text">
                                                {
                                                    element?.text?.split('\n').map((line, i) => (
                                                        <p key={i}>{line}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className="btn-frame">
                                                <a href={element.url}>
                                                    <p>쇼핑몰로 이동</p>
                                                    <i className="material-icons">arrow_forward_ios</i>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <div className="none">
                            <i className="material-icons">mood_bad</i>
                            <p>표시할 내용이 없어요...</p>
                        </div>
                    )
                }
            </article>
        </section>
    )
}

const EventType = ({type}) => {
    switch (type) {
        case "discount": {
            return (
                <p style={{backgroundColor: "#FE4F12"}}>할인</p>
            )
        }
        case "free" : {
            return (
                <p style={{backgroundColor: "#E61050"}}>무료배송</p>
            )
        }
        case "coupon" : {
            return (
                <p style={{backgroundColor: "#C11EFC"}}>쿠폰</p>
            )
        }
        case "saving" : {
            return (
                <p style={{backgroundColor: "#00966B"}}>적립</p>
            )
        }
        default: {
            return null;
        }
    }
}

export default EventMain;