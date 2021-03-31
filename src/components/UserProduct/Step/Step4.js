import Proptype from 'prop-types'
import { useEffect, useRef } from 'react';
import { sizeName, getSizeRate } from '../../../contents/js/ProductType';

// CSS
import '../../../contents/css/UserProduct/Step4.css';

const Step4 = ({data, setData, setStep, alertToggle, save}) => {

    // Copy
    const __data = JSON.parse(JSON.stringify(data));

    // Ref
    const listWrapper = useRef(null);
    const rateWrapper = useRef(null);
    const applyBtn = useRef(null);
    const option = useRef({
        size : undefined,
        sizeFrame : undefined
    });

    // Field
    const sizeRate = getSizeRate(data.info?.ptype);
    console.log("세부항목 : ",sizeRate)
    const event = {
        onType : (type, e) => {
            if(listWrapper.current.classList.contains("close")) {
                event.listToggle(false);
                event.rateListToggle(true);
            } else {
                if(e) e.stopPropagation();
                else return;
                let frame = e.target;
                for(let i=0; i < 3; ++i) {
                    if(frame.classList.contains("size-element")) break;
                    frame = frame.parentElement;
                }
                if(frame.classList.contains("size-element")) {
                    if(frame === option.current.sizeFrame) {
                        event.listToggle(true);
                        event.rateListToggle(false);
                    } else {
                        if(option.current.sizeFrame) {
                            option.current.sizeFrame.classList.remove("on");
                        }
                        frame.classList.add("on");
                        if(type === '직접입력') {
                            const inputSize = frame.querySelector("input.size-input").value;
                            console.log(inputSize);
                        } else {
                            option.current.size = type;
                            __data.size.name = type;
                        }
                        option.current.sizeFrame = frame;
                        setData(__data);
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
        inputSizeApply : (value) => {
            if(__data === value) return;
            option.current.size = value;
            __data.size.name = value;
            setData(__data);
        },
        onSize : (e) => {
            if(!e) return;
            e.stopPropagation();
            if(rateWrapper.current.classList.contains("close")) {
                event.listToggle(true);
                event.rateListToggle(false);
            } else {
                let frame = e.target;
                for(let i=0; i < 3; ++i) {
                    if(frame.classList.contains("size-element")) break;
                    frame = frame.parentElement;
                }
                if(!frame.classList.contains("size-element")) return;
                frame.classList.toggle("on");
            }
            
        },
        rateListToggle : (force) => {
            if(!rateWrapper.current) return;
            if(force === undefined) force = !rateWrapper.current.classList.contains("close");
            rateWrapper.current.classList.toggle("close",force);
            if(!force) applyBtn.current.innerHTML = "적용";
        },
        apply : () => {
            if(!listWrapper.current.classList.contains("close")) {
                if(option.current.size) {
                    event.listToggle(true);
                    event.rateListToggle(false);    
                } else alertToggle(true, "사이즈가 필요해요");
            } else if(!rateWrapper.current.classList.contains("close")) {
                // 하나 이상은 설정해야됨
                if(rateWrapper.current.querySelectorAll(".on").length > 0) {
                    applyBtn.current.innerHTML = "저장";
                    event.rateListToggle(true);
                    let pass = true;
                    const rate = {};
                    const frameArr = rateWrapper.current.querySelectorAll(".on");
                    
                    for(const frame of frameArr) {
                        const name = frame.querySelector("input[type='hidden']").value;
                        const value = Number(frame.querySelector("input[type='number']").value);
                        if(value < 1) {
                            pass = false;
                            break;
                        } else {
                            rate[name] = value;
                        }
                    }
                    if(!pass) alertToggle(true, "입력한 수치 정보가 잘못되었습니다.");
                    else {
                        rate.name = option.current.size
                        __data.size = rate;
                        setData(__data);
                        setStep(4);
                    }
                }
                else alertToggle(true, "하나 이상의 수치가 필요해요");
            } else {
                // Save
                save();
            }
        }
    }
    useEffect(() => {
        if(__data.size?.name) {
            if(listWrapper.current) {
                let frame = listWrapper.current.querySelector(`input[type='hidden'][value='${__data.size.name}']`);
                if(frame) {
                    frame = frame.parentElement;
                } else {
                    frame = listWrapper.current.querySelector(`input[type='hidden'][value='직접입력']`).parentElement;
                    console.log(frame);
                    listWrapper.current.querySelector(`input.size-input`).value = __data.size.name;
                }
                frame.classList.add("on");
                option.current.size = __data.size.name;
                option.current.sizeFrame = frame;
            }
            console.log(Object.entries(__data.size));
            for(const [key, value] of Object.entries(__data.size)) {
                if(key !== 'name') {
                    let frame = rateWrapper.current.querySelector(`input[type='hidden'][value='${key}']`);
                    if(frame) {
                        frame.parentElement.classList.add("on");
                        frame.parentElement.querySelector(`input.size-input`).value = value;
                    }
                }
            }
        }
    }, []);
    return (
        <>
            <header>
                <h1>사이즈 수치입력</h1>
                <p>저장하려는 상품의 사이즈 수치를 입력해주세요.</p>
            </header>
            <main>
                <div className="ptype-list-frame">
                    <ul ref={listWrapper} className={__data.size?.name ? 'close' : null}>
                        {
                            sizeName.map((element, index) => (
                                <li key={index} className="size-element" >
                                    <h1 onClick={(e) => event.onType(element, e)}>{element}</h1>
                                    <div className="dot"></div>
                                    <input type="hidden" value={element} />
                                    {
                                        element === '직접입력' ? (
                                            <div className="input-wrapper">
                                                <input 
                                                    type="text" 
                                                    className="size-input" 
                                                    onBlur={(e) => event.inputSizeApply(e.target.value)}
                                                    onKeyDown={(e) => {if(e.key === 'Enter') event.inputSizeApply(e.target.value)}}
                                                    placeholder="ex. XXL, 30, 260" 
                                                    minLength="1" 
                                                    maxLength="10"/>
                                            </div>
                                        ) : null
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
                
                <div className="ptype-list-frame">
                    <ul ref={rateWrapper} className={`${__data.size?.name ? null : 'close'} rate`}>
                        
                        {
                            sizeRate.map((element, index) => (
                                <li key={index} className="size-element" >
                                    <h1 onClick={(e) => event.onSize(e)}>{element[1]}</h1>
                                    <div className="dot"></div>
                                    <input type="hidden" value={element[0]} />
                                    <div className="input-wrapper">
                                        <input 
                                            type="number" 
                                            className="size-input"
                                            placeholder="0 (cm)" 
                                            minLength="1" 
                                            maxLength="7"/>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="apply" >
                    <h1 ref={applyBtn} onClick={() => event.apply()}>적용</h1>
                </div>
            </main>
        </>
    )
}

Step4.proptype = {
    data : Proptype.object.isRequired,
    setData : Proptype.func.isRequired,
    setStep : Proptype.func.isRequired,
    alertToggle : Proptype.func.isRequired,
    save : Proptype.func.isRequired
}

export default Step4;