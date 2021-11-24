import { useState } from "react";

const Step2_Manual = () => {
    const [step, setStep] = useState(1);

    function next() {
        setStep(step+1);
    }
    if(step !== 2) {
        return (
            <article id="manual" className="add_step1">
                <ManualStep step={step} next={next} />
            </article>
        )  
    } else {
        return null;
    }
}

const ManualStep = ({step, next}) => {
    switch(step) {
        case 1 : {
            return (
                <div id="step" className="step1">
                    <h1>추가하려는 옷을</h1><h1><strong>내가 알아보기 편한 이름</strong>으로 바꿔주세요.</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        default : return null;
    }
}

export default Step2_Manual;