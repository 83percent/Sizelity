import axios from 'axios';
import DateFormatModule from '../../contents/js/DateFormat';
// CSS
import '../../contents/css/Event/Event_List.css';

// Context
import {ServerContext} from '../../App';
import EventList from './Event_List';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

const TestData = [
    {
        sname : "906Studio",
        date : "Thu Aug 12 2021 17:26:03 GMT+0900 (한국 표준시)",
        image : "http://mayblue.jpg3.kr/product/marketing/roll/main_roll_banner_p09.jpg",
        type : "free",
        url : "https://906studio.co.kr/"
    },
    {
        sname : "메이블루",
        date : "Thu Aug 13 2021 17:26:03 GMT+0900 (한국 표준시)",
        image : "http://mayblue.jpg3.kr/product/marketing/roll/main_roll_banner_p09.jpg",
        type : "discount",
        url : "http://mayblue.co.kr/"
    },
    {
        sname : "메이블루",
        date : "Thu Aug 14 2021 17:26:03 GMT+0900 (한국 표준시)",
        image : "http://mayblue.jpg3.kr/product/marketing/roll/main_roll_banner_p09.jpg",
        type : "coupon",
        url : "http://mayblue.co.kr/"
    }
]
const EventMain = ({history}) => {
    // State
    const [_option, _setOption] = useState('all');
    const [_promotionArrays, _setPromotionArrays] = useState([...TestData]);
    const [_eventArrays, _setEventArrays] = useState([]);
    // Ref
    const optionFrameRef = useRef(null);

    // Context
    const server = useContext(ServerContext);

    // Field
    const eventCateArray = [
        ["free","무료배송"],
        ["discount","할인"],
        ["coupon", "쿠폰"],
        ["saving", "적립"]
    ];
    const getEvent = useCallback(async (option, count) => {
        await axios({
            method : 'GET',
            url : `${server}/event/${option}/${count}`,
            withCredentials: true,
            timeout: 7500
        }).then(response => {

        }).catch(err => {
            
        })
    }, [server]);
    const event = {
        optionSelect : function(option, target) {
            if(_option === option) return;
            if(optionFrameRef.current !== null) {
                optionFrameRef.current.classList.remove("active");
            }
            target.classList.add("active");
            optionFrameRef.current = target;
            _setOption(option);
        }
    }
    useEffect(() => {
        /* getEvent(_option,0); */
    }, [_option, getEvent]);
    return (
        <section id="Event">
            <header>
                <div className="title">
                    <h1>진행중인 이벤트</h1>
                </div>
                <button onClick={() => history.goBack()}>
                    <i className="material-icons">arrow_back</i>
                </button>
            </header>
            <ul>
                <li onClick={(e) => event.optionSelect("all", e.target)} className="active" ref={optionFrameRef}>전체</li>
                {
                    eventCateArray.map((element,index) => (
                        <li key={index} onClick={(e) => event.optionSelect(element[0], e.target)}>{element[1]}</li>
                    ))
                }
            </ul>
            <article>
                {
                    _promotionArrays.length > 0 ? (
                        <section className="promotion">
                            <div className="title">
                                <h2>프로모션</h2>
                            </div>
                            <ul>
                                {
                                    TestData.map((element, index) => (
                                        <li key={index}>
                                            <a href={element.url}>
                                                <div className="info">
                                                    <div>
                                                        <h3>{element.sname}</h3>
                                                        <EventType type={element.type} />
                                                    </div>
                                                    <p>{DateFormatModule.eventDay(element.date)}</p>
                                                </div>
                                                <img src={element.image} alt={index} />
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    ) : null
                }
                <section>
                    <div className="title">
                        <h2>진행중인 이벤트</h2>
                    </div>
                    {
                        _eventArrays.length > 0 ? (
                            <ul></ul>
                        ) : (
                            <div className="none">
                                <i className="material-icons">sentiment_neutral</i>
                                <p>진행중인 이벤트가 없어요..</p>
                            </div>
                        )
                    }
                </section>
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