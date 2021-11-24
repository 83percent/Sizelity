import { useState } from "react";

const Step3_Manual = () => {
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
                    <h1>추가하려는 옷은 <strong>어떤 옷</strong> 인가요?</h1>
                    <div className="next" onClick={() => next()}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            )
        }
        default : return null;
    }
}

export default Step3_Manual;