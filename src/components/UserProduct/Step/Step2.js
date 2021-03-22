import Proptype from 'prop-types'
import { ptype } from '../../../contents/js/ProductType';
import { useRef } from 'react';

// CSS
import '../../../contents/css/UserProduct/Step2.css';

const Step2 = ({data, setData, setStep, alertToggle}) => {
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
                listWrapper.current.classList.toggle("close",force);
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
                    const __data = JSON.parse(JSON.stringify(data));
                    __data.info.ptype = option.current.type;
                    __data.info.subtype = option.current.subtype;
                    setData(__data);
                    setStep(3);
                }
            }
        }
    }
    return (
        <>
            <header>
                <h1>어떤 종류인가요?</h1>
                <p>어떤 종류의 옷인가요?</p>
                <p>종류별로 정리되어 저장됩니다.</p>
            </header>
            <main>
                <div className="ptype-list-frame">
                    <ul ref={listWrapper}>
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
                        <h1>Test</h1>
                        <div className="dot"></div>
                    </div>
                    <div className="in close" ref={subInputWrapper}>
                        <div className="sub-input-wrapper">
                            <div className="title">
                                <h1>세부 종류 입력</h1>
                                <p>추후 쉽게 구별하기 위해</p>
                                <p>입력하는 것을 추천합니다</p>
                            </div>
                            <div className="sub-input-frame">
                                <input type="text" autoComplete="off" placeholder="ex) 긴바지, 반팔" ref={subInput}/>
                                <p>생략 또는 2 ~ 8글자</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="apply" >
                    <h1 ref={applyBtn} onClick={() => event.apply()}>적용</h1>
                </div>
            </main>
        </>
    )
}

Step2.proptype = {
    data : Proptype.object.isRequired,
    setData : Proptype.func.isRequired,
    setStep : Proptype.func.isRequired,
    alertToggle : Proptype.func.isRequired
}

export default Step2;