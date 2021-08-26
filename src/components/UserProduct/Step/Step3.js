import { ptype } from '../../../contents/js/ProductType';
import { useEffect, useRef } from 'react';

// CSS
import '../../../contents/css/UserProduct/Step3.css';

const Step3 = ({data, setData, setStep, alertToggle}) => {

    const __data = JSON.parse(JSON.stringify(data));

    const applyBtn = useRef(null);
    const listWrapper = useRef(null);
    const subInputWrapper = useRef(null);
    const subInput = useRef(null);
    const subTextFrame = useRef(null);

    const option = useRef({
        type : undefined,
        typeFrame : undefined,
        subtype : undefined
    });
    const event = {
        onType : (type, e) => {
            if(listWrapper.current.classList.contains("close")) {
                event.listToggle(false);
                event.subInputToggle(true);
            } else {
                if(e) e.stopPropagation();
                else return;
                let frame = e.target;
                for(let i=0; i < 3; ++i) {
                    if(frame.classList.contains("size-element")) break;
                    frame = frame.parentElement;
                }
                if(frame.classList.contains("size-element")) {
                    if(frame === option.current.typeFrame) {
                        event.listToggle(true);
                        event.subInputToggle(false);
                    } else {
                        if(option.current.typeFrame) {
                            option.current.typeFrame.classList.remove("on");
                        }
                        frame.classList.add("on");
    
                        option.current.type = type;
                        option.current.typeFrame = frame;
                    }
                }
            }
        },
        listToggle : (force) => {
            if(!listWrapper.current) return;
            else {
                listWrapper.current.classList.toggle("close", force);
                if(!force) applyBtn.current.innerHTML = "적용";
            }
        },
        subInputToggle : (force) => {
            if(!subInputWrapper.current) return;
            else {
                subInputWrapper.current.classList.toggle("close",force);
                if(!force) applyBtn.current.innerHTML = "적용";
            }
        },
        subTextToggle : (force) => {
            if(!subTextFrame.current) return;
            else {
                subTextFrame.current.classList.toggle("close",force);
            }
        },
        apply : () => {
            if(!listWrapper.current.classList.contains("close")) {
                if(option.current.type) {
                    event.listToggle(true);
                    event.subInputToggle(false);
                }
                else alertToggle(true,"종류를 선택해주세요.");
            } else {
                if(!subInputWrapper.current.classList.contains("close")) {
                    const sub = subInput.current.value;
                    if(sub.length === 0 || (sub.length > 1 && sub.length < 9 )) {
                        subTextFrame.current.querySelector("h1").innerHTML = sub;
                        sub.length === 0 ? option.current.subtype = undefined : option.current.subtype = sub;
                        event.subInputToggle(true);
                        sub.length === 0 ? event.subTextToggle(true) : event.subTextToggle(false);
                        applyBtn.current.innerHTML = "다음단계";
                    } else {
                        option.current.subtype = undefined;
                        event.subTextToggle(true);
                        alertToggle(true,"세부 종류는 생략 또는 2~8 글자 입력이 가능합니다.");
                    }
                } else {
                    // 다음 단계
                    console.log("저장하려는 데이터 : ", option.current);
                    
                    __data.info.ptype = option.current.type;
                    __data.info.subtype = option.current.subtype;
                    setData(__data);
                    setStep(4);
                }
            }
        }
    }
    useEffect(() => {
        // 기본 설정
        if(__data.info.ptype) {
            if(listWrapper.current) {
                let frame = listWrapper.current.querySelector(`input[type='hidden'][value='${__data.info.ptype}']`);
                if(frame) {
                    frame = frame.parentElement;
                    frame.classList.add("on");
                    option.current.type = __data.info.ptype;
                    option.current.typeFrame = frame;
                    if(__data.info.subtype) option.current.subtype = __data.info.subtype;
                }
            }
        }
    }, []);
    return (
        <>
            <header>
                <h1>어떤 종류인가요?</h1>
                <p>옷의 종류를 선택하여 옷장을 정리해보세요.</p>
                <p>옷의 세부 종류를 입력하면 옷 비교 중 도움이 될거에요.</p>
            </header>
            <main>
                <div className="ptype-list-frame">
                    <ul ref={listWrapper} className={__data.info.ptype ? "close" : null}>
                        {
                            ptype.map((element, index) => {
                                return (
                                    <li key={index} className="size-element" onClick={(e) => event.onType(element.value, e)}>
                                        <h1>{element.name}</h1>
                                        <div className="dot"></div>
                                        <input type="hidden" value={element.value} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="out close" ref={subTextFrame} onClick={() => {event.subInputToggle(false); event.listToggle(true);}}>
                        <h1></h1>
                        <div className="dot"></div>
                    </div>
                    <div className={`in ${__data.info.ptype ? null : "close"}`} ref={subInputWrapper}>
                        <div className="sub-input-wrapper">
                            <div className="title">
                                <h1>세부 종류 입력</h1>
                                <p>비교 중에 내 옷의 특징을 잘 알 수 있게 입력해주세요.</p>
                            </div>
                            <div className="sub-input-frame">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="ex) 긴바지, 반팔"
                                    defaultValue={__data.info.subtype? __data.info.subtype : null}
                                    ref={subInput}/>
                                <p>생략 또는 2 ~ 8글자</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="apply">
                    <h1 ref={applyBtn} onClick={() => event.apply()}>적용</h1>
                </div>
            </main>
        </>
    )
}

export default Step3;