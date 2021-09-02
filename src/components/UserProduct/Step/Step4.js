import { useEffect, useMemo, useRef, useState } from 'react';
import { getSizeRate, getSizeRateName } from '../../../contents/js/ProductType';

// CSS
import '../../../contents/css/UserProduct/Step4.css';


const Step4 = ({data, setData, setStep, alertToggle, save}) => {
    // Field
    const SizeNameArray = ["S", "M", "L", "XL"];

    // Memo
    const __data = useMemo(() => {
        return JSON.parse(JSON.stringify(data));
    }, [data]) 
    
    // State
    const [sizeName, setSizeName] = useState(() => {
        if(__data?.size?.name) {
            if(SizeNameArray.includes(__data.size.name)) return __data.size.name;
            else return "self";
        } else return undefined;
    });
    const [selfName, setSelfName] = useState(() => {
        if(__data?.size?.name) {
            if(SizeNameArray.includes(__data.size.name)) return "";
            else return __data.size.name;
        } else return "";
    });


    // Ref
    const sizeListWrapper = useRef(null);
    const rateWrapper = useRef(null);
    
    const sizeRate = getSizeRate(data.info?.ptype);

    const event = {
        onSizeName : (value) => {
            const sizeClassList = sizeListWrapper.current.classList;
            if(sizeClassList.contains("close")) {
                sizeClassList.remove("close");
                rateWrapper.current.classList.remove("on");
            } else {
                sizeClassList.add("close");
                rateWrapper.current.classList.add("on");
                setSizeName(value)
            }
        }, // onSizeName
        onSize : function(target) {
            if(target.parentElement.nodeName !== 'LI') return;
            else target.parentElement.classList.toggle('on');

        },
        apply : () => {
            if(sizeName) {
                const sizeObject = {};
                if(SizeNameArray.includes(sizeName)) {
                    // 목록 중에 고름
                    sizeObject.name = sizeName;
                } else if(sizeName === 'self') {
                    // 직접 입력
                    if(selfName.length > 7 || selfName.length < 2) {
                        // 직접 입력인데 입력 안됨
                        alertToggle(true, "사이즈 명칭을 입력해주세요", 'error');
                        return;
                    }
                    sizeObject.name = selfName;
                } else return;

                // 부위별 수치 값 가져오기
                const activeFrames = rateWrapper.current.querySelectorAll('li.on');
                if(activeFrames.length > 0) {
                    let pass = true;
                    for(const element of activeFrames) {
                        const frame = element.getElementsByTagName('input')[0];
                        const value = frame.value || 0;
                        if(value <= 0) {
                            alertToggle(true, `'${getSizeRateName(frame.name)}'가 비었어요`, 'error')
                            pass = false;
                            break;
                        } else if(value > 400) {
                            alertToggle(true, `'${getSizeRateName(frame.name)}'가 너무 큽니다.`, 'error')
                            pass = false;
                            break;
                        } else {
                            sizeObject[frame.name] = value;
                            __data.size = sizeObject;
                            setData(__data);
                        }
                    }
                    if(!pass) return;
                    save(true);
                } else {
                    alertToggle(true, "하나 이상의 사이즈 입력이 필요해요", 'error');
                    return;
                }
            } else {
                alertToggle(true, "사이즈 명칭을 선택해주세요", 'error');
            }
        }
    }
    useEffect(() => {
        if(!sizeName) {
            sizeListWrapper.current.classList.remove("close");
            return;
        }
        else {
            let frame = document.querySelector(`input[name="sizeName"][value="${sizeName}"]`);
            if(!frame) return;
            else frame = frame.parentElement;
            
            frame.classList.add("on");
            return () => {
                let frame = document.querySelector(`input[name="sizeName"][value="${sizeName}"]`);
                if(!frame) return;
                else frame = frame.parentElement;
                
                frame.classList.remove("on");
            }
        }
    }, [sizeName]);

    useEffect(() => {
        if(!data?.size) return;
        for(const [rateName, value] of Object.entries(data.size)) {
            if(rateName !== 'name') {
                const frame = rateWrapper.current.querySelector(`input[name="${rateName}"]`);
                if(frame) {
                    frame.parentElement.classList.add("on");
                    frame.value = value;
                }
            }
        }
    }, [])

    return (
        <>
            <header>
                <h1>사이즈 선택</h1>
                <p>옷의 사이즈를 골라주세요.</p>
                <p>목록에 없다면 직접 적어주세요.</p>
            </header>
            <main>
                <div className="name">
                    <ul ref={sizeListWrapper} className={__data.size?.name ? 'close' : null}>
                        {
                            SizeNameArray.map((element, index) => (
                                <li key={index}>
                                    <div className="dot"><i className="material-icons">check</i></div>
                                    <h1 onClick={() => event.onSizeName(element)}>{element}</h1>
                                    <input type="hidden" name="sizeName" value={element} />
                                </li>
                            ))
                        }
                        <li>
                            <div className="dot"><i className="material-icons">check</i></div>
                            <h1 onClick={() => event.onSizeName("self")}>직접입력</h1>
                            <input type="hidden" name="sizeName" value="self" />
                        </li>
                    </ul>
                    {
                        sizeName === 'self' ? (
                            <div className="input-wrapper">
                                <input 
                                    type="text" 
                                    onChange={(e) => setSelfName(e.target.value)}
                                    placeholder="ex) XXL, 30, 260" 
                                    minLength="1" 
                                    maxLength="7"/>
                                <p>{selfName.length}/7</p>
                            </div>
                        ) : null
                    }
                </div>
                <div ref={rateWrapper} className={`size ${__data.size?.name ? "on" : ""}`}>
                    <div className="title">
                        <h2>사이즈 입력</h2>
                        <p>수치를 알고 있는 부위를 선택해 입력해주세요.</p>
                    </div>
                    <ul>
                        {
                            sizeRate.map((element, index) => (
                                <li key={index}>
                                    <div className="dot"></div>
                                    <h1 onClick={(e) => event.onSize(e.target)}>{element[1]}</h1>
                                    <input 
                                        type="number" 
                                        name={element[0]}
                                        placeholder="0" 
                                        minLength="1" 
                                        maxLength="7"/>
                                </li>
                            ))
                        }
                    </ul>
                    <button name="apply" onClick={() => event.apply()}>저장</button>
                </div>
            </main>
            
        </>
    )
}
export default Step4;