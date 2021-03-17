import { useRef, useState } from "react"

// CSS
import '../../contents/css/UserProduct/Step.css';

// Component 
import Step1 from './Step/Step1';
import Step2 from './Step/Step2';
import Step3 from './Step/Step3';

const Step = ({data, setData, step, setStep, alertToggle}) => {
    const __data = JSON.parse(JSON.stringify(data));
    
    // Ref

    // 4
    const nickInput = useRef(null);
    const nickUnset = useRef(null);

    const event = {
        step4 : {
            unsetToggle : () => {
                if(!nickUnset.current || !nickInput.current) return;
                nickInput.current.classList.toggle("off",nickUnset.current.checked);
                nickInput.current.disabled = nickUnset.current.checked;
                const t = nickUnset.current.previousElementSibling;
                t.classList.toggle("on");
                
            },
            apply : () => {
                console.log("apply")
                // unset 일 경우 => pname 존재하야함

                if(__data.praw ? (!nickUnset.current || !nickInput.current) : !nickInput.current) return;
                const isUnset = (__data.praw ? nickUnset.current.checked : false);
                if(isUnset) {
                    if(__data.info.pname) {
                        if(__data.info.nick) delete __data.info.nick;
                        setData(__data);
                    } else {
                        // 미지정으로 지정할 수 없음.
                    }
                } else {
                    // 지정 명칭 존재
                    //data.info.nick = nickInput.current.value;
                    const __nick = nickInput.current.value;
                    console.log(__nick);
                    if(__nick.length > 1 && __nick.length < 21) {
                        __data.info.nick = __nick;
                        setData(__data);
                    }
                    
                }
            }
        }
    }

    switch(step) {
        case 1 : {
            return (
                <div className="step-wrapper step1">
                    <Step1 
                        data={data}
                        setData={setData}
                        setStep={setStep}
                        alertToggle={alertToggle}/>
                </div>
            )
        }
        case 2 : {
            return (
                <div className="step-wrapper step2">
                    <Step2
                        data={data}
                        setData={setData}
                        setStep={setStep}
                        alertToggle={alertToggle}/>
                </div>
            )
        }
        case 3 : {
            return (
                <div className="step-wrapper step3">
                    <Step3
                        data={data}
                        setData={setData}
                        setStep={setStep}
                        alertToggle={alertToggle}/>
                </div>
            )
        }
        case 4 : {
            return (
                <div className="step-wrapper step4">
                    <header>
                        <h1>어떻게 표시할까요?</h1>
                        <p>나중에 알아볼 수 있는 이름을 지어주세요.</p>
                        <p>언제든지 수정 가능할 수 있어요.</p>
                        <p>미지정은 상품명이 존재하는 경우만 사용할 수 있어요.</p>
                    </header>
                    <main>
                        <div className="input-frame">
                            <input type="text" ref={nickInput} autoComplete="off" placeholder="이름을 만들어주세요." maxLength="20" defaultValue={__data.info.nick ? __data.info.nick : undefined}/>
                            <h2>2~20자 사용가능합니다.</h2>
                            {
                                __data.info.pname ? (
                                    <>
                                        <p className="line">OR</p>
                                        <label>
                                            <h1>미지정</h1>
                                            <input type="checkbox" ref={nickUnset} style={{display:"none"}} onChange={() => event.step4.unsetToggle()}/>
                                        </label>
                                    </>
                                ) : null
                            }
                            
                        </div>
                        <div className="apply" >
                            <h1 onClick={() => event.step4.apply()}>적용</h1>
                        </div>
                    </main>
                    
                </div>
            )
        }
    }
}
export default Step;