import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import NoticeModule from "../../../contents/js/notice/Notice";
import DateForm from '../../../contents/js/DateFormat';

// Context
import { ServerContext } from '../../../App';

// CSS
const NoticeList = ({history}) => {
    // State
    const [data, setData] = useState(undefined);
    
    // Context
    const server = useContext(ServerContext);

    const getData = useCallback(async () => {
        const noticeModule = new NoticeModule(server);
        const response = await noticeModule.get();
        
        switch(response.type) {
            case 'success' : {
                setData(response.data);
                break;
            }
            case 'error' : 
            default : {
                setData(null);
            }    
        }
    }, [server, data]);

    // Memo
    const importantNotices = useMemo(() => {
        if(data) {
            const __important = data.filter(e => e.important === true);
            if(__important.length > 0) return __important;
            else return null;
        }
        else return null;
    }, [data])
    
    const notices = useMemo(() => {f
        if(data) return data.filter(e => e.important === alse);
        else return null;
    }, [data]);

    const event = {
        noticeToggle : function(target) {
            for(let i=0; i<5; ++i) {
                if(target.nodeName === 'LI') break;
                else target = target.parentElement;
            }
            if(target.nodeName !== 'LI') return;
            target.classList.toggle("on");
        }
    }


    useEffect(() => {
        if(data === undefined) getData();
    }, [data, getData]);

    if(data === undefined) {
        return (
            <section id="list-wrapper">
                <div className="loader-frame">
                    <div className="loader"></div>
                </div>
            </section>
        )
    } else {
        return (
            <section id="list-wrapper">
                <header>
                    <h1>공지사항</h1>
                    <i className="material-icons" onClick={() => history.goBack()}>arrow_back</i>
                </header>
                {
                    data === null ? (
                        <div className="wrong">
                            <p>공지사항을 불러오는데 실패했어요</p>
                        </div>
                    ) :  data.length === 0 ? (
                        <div className="none">
                            <i className="material-icons">sentiment_neutral</i>
                            <p>공지가 없어요</p>
                        </div>
                    ) : (
                        <>
                        {
                            importantNotices ? (
                                <ul className="notice-wrapper important">
                                    {
                                        importantNotices.map((element, index) => (
                                            <li key={index}>
                                                <div className="title" onClick={(e) => event.noticeToggle(e.target)}>
                                                    <div>
                                                        <p>{DateForm.get(element.reg_date)}</p>
                                                        <h2>{element.title}</h2>
                                                    </div>
                                                    <i className="material-icons">expand_more</i>
                                                </div>
                                                <div className="text">
                                                {
                                                    element.text.split("\n").map((line, i) => (
                                                        <p key={i}>{line}</p>
                                                    ))
                                                }
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : null
                        }
                        <ul className="notice-wrapper">
                            {
                                notices.map((element, index) => (
                                    <li key={index}>
                                        <div className="title" onClick={(e) => event.noticeToggle(e.target)}>
                                            <div>
                                                <p>{DateForm.get(element.reg_date)}</p>
                                                <h2>{element.title}</h2>
                                            </div>
                                            <i className="material-icons">expand_more</i>
                                        </div>
                                        <div className="text">
                                        {
                                            element.text.split("\n").map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))
                                        }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        </>
                    )
                }
            </section>
        )
    }

}

export default NoticeList;