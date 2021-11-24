import { useState } from "react";

const Step4_Manual = ({close}) => {
    const [step, setStep] = useState(1);

    function next() {
        setStep(step+1);
    }
    if(step !== 4) {
        return (
            <article id="manual" className="add_step1">
                <ManualStep step={step} next={next} close={close}/>
            </article>
        )  
    } else {
        return null;
    }
}

const ManualStep = ({step, next, close}) => {
    switch(step) {
        case 1 : {
            return (
                <div id="step" className="step1">
                    <h1>옷의 <strong>사이즈명을 선택</strong>해요.</h1>
                    <h1>목록에 없나요?</h1>
                    <h1>직접입력할 수 있어요!</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 2 : {
            return (
                <div id="step" className="step1">
                    <h1>옷의 치수를 <strong>입력 또는 수정</strong>할 수 있어요.</h1>
                    <p>구매한 옷을 수선 했다면, 수정해주세요.</p>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        case 3 : {
            return (
                <div id="step" className="step1">
                    <h1>입력한 옷을 <strong>저장 버튼</strong>을 눌러</h1>
                    <h1><strong>옷장에 추가</strong>해주세요.</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">check</i>
                    </div>
                    <button onClick={() => close(true)}>다시 보지 않기</button>
                </div>
            )
        }
        default : return null;
    }
}

export default Step4_Manual;