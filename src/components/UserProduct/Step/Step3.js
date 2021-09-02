import { ptype as ProductTypeArrays } from '../../../contents/js/ProductType';
import { useEffect, useMemo, useRef, useState } from 'react';

// CSS
import '../../../contents/css/UserProduct/Step3.css';

const Step3 = ({data, setData, setStep, alertToggle}) => {
    // Memo
    const __data = useMemo(() => {
        return JSON.parse(JSON.stringify(data));
    }, [data]);

    // State
    const [ptype, setPtype] = useState(__data?.info?.ptype);
    const [subType, setSubType] = useState(__data?.info?.subtype || "")

    // Ref
    const subInputWrapper = useRef(null);
    const listWrapper = useRef(null);
    
    const event = {
        onType : (type) => {
            const listClassList = listWrapper.current.classList;
            if(listClassList.contains("close")) {
                listClassList.remove("close");
                // 세부 정보 닫기
                listWrapper.current.classList.remove("close");
                subInputWrapper.current.classList.remove("on");
            } else {
                setPtype(type);
                // 세부 정보 열기
                listWrapper.current.classList.add("close");
                subInputWrapper.current.classList.add("on");
            }
        },
        apply : () => {
            if(!ptype) {
                alertToggle(true, "옷의 종류를 선택해주세요", 'error');
                return;
            } else if((subType.length < 2 || subType.length > 10)) {
                alertToggle(true, "세부 종류를 입력해주세요", 'error');
                return;
            }
            try {
                __data.info.ptype = String(ptype).trim();
                __data.info.subtype = String(subType).trim();

                setData(__data);
                setStep(4);
            } catch {
                alertToggle(true, "문제가 발생했어요", 'error');
            }
            
        }
    }

    useEffect(() => {
        if(!ptype) {
            // 초기 값 없음.
            listWrapper.current.classList.remove("close");
        } else {
            let frame = document.querySelector(`input[name="ptype"][value="${ptype}"]`);
            if(!frame) return;
            else frame = frame.parentElement;
            frame.classList.add("on");
            return () => {
                let frame = document.querySelector(`input[name="ptype"][value="${ptype}"]`);
                if(!frame) return;
                else frame = frame.parentElement;
                frame.classList.remove("on");
            }
        }
    }, [ptype]);

    return (
        <>
            <header>
                <h1>어떤 종류인가요?</h1>
                <p>옷의 종류를 선택하여 옷장을 정리해보세요.</p>
                <p>옷의 세부 종류를 입력하면 옷 비교 중 도움이 될거에요.</p>
            </header>
            <main style={{paddingBottom: "0"}}>
                <ul ref={listWrapper} className={ptype ? "close":null}>
                    {
                        ProductTypeArrays.map((element, index) => {
                            return (
                                <li key={index} onClick={() => event.onType(element.value)}>
                                    <div className="dot"><i className="material-icons">check</i></div>
                                    <h1>{element.name}</h1>
                                    <input type="hidden" name="ptype" value={element.value} />
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <div className={`input-wrapper ${ptype ? "on" : ""}`} ref={subInputWrapper}>
                        <div className="title">
                            <h2>세부 종류 입력</h2>
                            <p>내 옷의 크기를 짐작할 수 있는 옷의 세부 종류를 입력해주세요.</p>
                            <p>예) 청바지(X), 긴바지(O) 또는 긴청바지(O)</p>
                        </div>
                        <div className="input-frame">
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="ex) 긴바지, 8부 바지, 반팔"
                                maxLength="10"
                                onChange={(e) => setSubType(e.target.value)}
                                defaultValue={__data?.info.subtype ? __data.info.subtype : null}/>
                            <p>{subType.length}/10</p>
                        </div>
                    </div>
                </div>
            </main>
            <div className="apply-frame">
                <button onClick={() => event.apply()} disabled={(subType.length < 2 || subType.length > 10)}>다음단계</button>
            </div>
        </>
    )
}

export default Step3;